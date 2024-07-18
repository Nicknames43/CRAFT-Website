import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import {
  selectPropertyById,
  useDeletePropertyMutation,
} from "../../app/api/propertiesApiSlice"
import { PROPERTY_TYPES } from "../../config/propertyTypes"

const Property = ({ propertyId }) => {
  const property = useSelector((state) => selectPropertyById(state, propertyId))

  const [deleteProperty] = useDeletePropertyMutation()

  const navigate = useNavigate()

  const handleDelete = async () => {
    await deleteProperty({ id: property.id })
  }

  if (property) {
    const handleEdit = () => navigate(`/dash/properties/${propertyId}`)
    const type =
      property.__t === PROPERTY_TYPES.commercial
        ? "Commercial"
        : property.__t === PROPERTY_TYPES.residential
        ? "Residential"
        : "Not Applicable"

    return (
      <tr className="table__row">
        <td className="table__cell property__name">{property.name}</td>
        <td className="table__cell property__published">
          {property.published ? "Yes" : "No"}
        </td>
        <td className="table__cell property__featured">
          {property.featured ? "Yes" : "No"}
        </td>
        <td className="table__cell property__status">
          {property.developed ? "Developed" : "Under development"}
        </td>
        <td className="table__cell property__type">{type}</td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell">
          <button className="icon-button table__button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    )
  } else return null
}
export default Property
