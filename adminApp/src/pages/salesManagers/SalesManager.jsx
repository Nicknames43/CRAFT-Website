import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import {
  useGetSalesManagersQuery,
  useDeleteSalesManagerMutation,
} from "../../app/api/salesManagersApiSlice"
import { memo } from "react"

const SalesManager = ({ salesManagerId }) => {
  const { salesManager } = useGetSalesManagersQuery("salesManagersList", {
    selectFromResult: ({ data }) => ({
      salesManager: data?.entities[salesManagerId],
    }),
  })

  const [deleteSalesManager] = useDeleteSalesManagerMutation()

  const navigate = useNavigate()

  if (salesManager) {
    const handleEdit = () => navigate(`/dash/salesManagers/${salesManagerId}`)

    const handleDelete = async () => {
      await deleteSalesManager({ id: salesManager.id })
    }

    return (
      <tr className="table__row sales-manager">
        <td className="table__cell sales-manager__name">{salesManager.name}</td>
        <td className="table__cell sales-manager__phone">
          {salesManager.phone}
        </td>
        <td className="table__cell sales-manager__email">
          {salesManager.email}
        </td>
        <td className="table__cell table__button-container sales-manager__edit">
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
        <td className="table__cell table__button-container sales-manager__delete">
          <button className="icon-button table__button" onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrashCan} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedSalesManager = memo(SalesManager)
export default memoizedSalesManager
