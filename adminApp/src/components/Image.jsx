import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { BACKEND_API_URL } from "../config/backendApiURL"

const animateLayoutChanges = (args) => {
  const { isSorting, wasDragging } = args

  if (isSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args)
  }
  return true
}

const Image = ({ id, onClick, newImg }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ animateLayoutChanges, id })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    backgroundImage: newImg
      ? `url(${id})`
      : `url(${BACKEND_API_URL.images}/${id})`,
  }
  return (
    <div style={style} ref={setNodeRef} {...attributes} className="image">
      <button {...listeners}>Drag</button>
      <button onClick={onClick}>Remove</button>
    </div>
  )
}
export default Image
