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
import { useState } from "react"
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable"
import Elem from "./elem"

const Test = () => {
  const [imageOrder, setImageOrder] = useState([]) // [{new: true/false, id: url, file: (for new ones)}]

  const getImagePos = (id) => imageOrder.findIndex((image) => image.id === id)

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
    setImageOrder((imageOrder) => imageOrder.filter((image) => image.id !== id))
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

  const handleNewPics = (event) => {
    const savedPics = imageOrder.filter((image) => !image.new)
    const oldPics = imageOrder.filter((image) => image.new)

    for (const pic of oldPics) {
      URL.revokeObjectURL(pic.id)
    }

    for (const pic of event.target.files ?? []) {
      savedPics.push({ new: true, id: URL.createObjectURL(pic), file: pic })
    }
    setImageOrder(savedPics)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      Test
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={closestCorners}
        measuring={measuringConfig}
      >
        <SortableContext items={imageOrder} strategy={rectSortingStrategy}>
          <div className="testBox">
            {imageOrder.map((image) => {
              return (
                <Elem
                  id={image.id}
                  key={image.id}
                  onClick={() => handleRemove(image.id)}
                />
              )
            })}
          </div>
        </SortableContext>
      </DndContext>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="pics"
          id="pics"
          multiple
          onChange={handleNewPics}
        />
        <button type="submit">Upload</button>
      </form>
    </div>
  )
}

export default Test
