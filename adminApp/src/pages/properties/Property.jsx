import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import {
  useDeletePropertyMutation,
  useGetPropertiesQuery,
} from "../../app/api/propertiesApiSlice"
import { PROPERTY_TYPES } from "../../config/propertyTypes"
import { memo } from "react"

const Property = ({ propertyId }) => {
  const { property } = useGetPropertiesQuery("propertiesList", {
    selectFromResult: ({ data }) => ({
      property: data?.entities[propertyId],
    }),
  })

  const [deleteProperty] = useDeletePropertyMutation()

  const navigate = useNavigate()

  if (property) {
    const handleEdit = () => navigate(`/dash/properties/${propertyId}`)

    const handleDelete = async () => {
      await deleteProperty({ id: property.id })
    }

    const type =
      property.__t === PROPERTY_TYPES.commercial
        ? "Commercial"
        : property.__t === PROPERTY_TYPES.residential
        ? "Residential"
        : "Not Applicable"

    return (
      <tr className="table__row property">
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
        <td className="table__cell table__button-container property__edit">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell table__button-container property__delete">
          <button className="icon-button table__button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedProperty = memo(Property)
export default memoizedProperty
