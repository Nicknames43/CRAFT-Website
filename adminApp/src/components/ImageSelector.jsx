import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  MeasuringStrategy,
} from "@dnd-kit/core"
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Image from "./Image"
import PropTypes from "prop-types"

const ImageSelector = ({ imageOrder, setImageOrder }) => {
  const getImagePos = (id) => imageOrder.findIndex((img) => img.id === id)

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (active.id === over.id) return

    setImageOrder((imageOrder) => {
      const ogPos = getImagePos(active.id)
      const newPos = getImagePos(over.id)

      return arrayMove(imageOrder, ogPos, newPos)
    })
  }

  const handleRemove = (id) => {
    setImageOrder((imageOrder) => imageOrder.filter((img) => img.id !== id))
  }

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  const measuringConfig = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  }

  const handleNewImages = (event) => {
    const savedImages = imageOrder.filter((img) => !img.new)
    const oldImages = imageOrder.filter((img) => img.new)

    for (const img of oldImages) {
      URL.revokeObjectURL(img.id)
    }

    for (const img of event.target.files ?? []) {
      savedImages.push({ new: true, id: URL.createObjectURL(img), file: img })
    }
    setImageOrder(savedImages)
  }

  return (
    <>
      <label className="form__label" htmlFor="images">
        Images:{" "}
        <input
          className="form__input--file"
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleNewImages}
        />
      </label>
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        measuring={measuringConfig}
      >
        <SortableContext items={imageOrder} strategy={rectSortingStrategy}>
          <div className="image-selector">
            {imageOrder.map((img) => {
              return (
                <Image
                  id={img.id}
                  newImg={img.new}
                  key={img.id}
                  onClick={() => handleRemove(img.id)}
                />
              )
            })}
          </div>
        </SortableContext>
      </DndContext>
    </>
  )
}

export default ImageSelector

ImageSelector.propTypes = {
  imageOrder: PropTypes.arrayOf(
    PropTypes.shape({
      new: PropTypes.bool.isRequired,
      id: PropTypes.string.isRequired,
      file: PropTypes.instanceOf(File),
    })
  ).isRequired,
  setImageOrder: PropTypes.func.isRequired,
}
