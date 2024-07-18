import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

const animateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args)
  }
  return true
}

const Elem = ({ id, onClick }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ animateLayoutChanges, id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: `url(${id})`,
  }
  return (
    <div style={style} ref={setNodeRef} {...attributes} className="elem">
      <button {...listeners}>Drag</button>
      <button onClick={onClick}>Remove</button>
    </div>
  )
}
export default Elem
