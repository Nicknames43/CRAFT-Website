import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectPropertyById } from "../../app/api/propertiesApiSlice"

const Property = ({ propertyId }) => {
  const property = useSelector((state) => selectPropertyById(state, propertyId))

  const navigate = useNavigate()

  if (property) {
    const propertyStatusString = property.status
      .toString()
      .replaceAll(",", ", ")

    const handleEdit = () => navigate(`/dash/properties/${propertyId}`)

    return (
      <tr className="table__row">
        <td className="table__cell property__name">{property.name}</td>
        <td className="table__cell property__status">{propertyStatusString}</td>
        <td className="table__cell property__type">{property.type}</td>

        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}
export default Property
