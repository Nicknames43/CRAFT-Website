import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useGetSalesManagersQuery } from "../../app/api/salesManagersApiSlice"
import { memo } from "react"

const SalesManager = ({ salesManagerId }) => {
  const { salesManager } = useGetSalesManagersQuery("salesManagersList", {
    selectFromResult: ({ data }) => ({
      salesManager: data?.entities[salesManagerId],
    }),
  })

  const navigate = useNavigate()

  if (salesManager) {
    const handleEdit = () => navigate(`/dash/salesManagers/${salesManagerId}`)

    return (
      <tr className="table__row salesManager">
        <td className={`table__cell`}>{salesManager.name}</td>
        <td className={`table__cell`}>{salesManager.phone}</td>
        <td className={`table__cell`}>{salesManager.email}</td>
        <td className={`table__cell`}>
          <button className="icon-button table__button" onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    )
  } else return null
}

const memoizedSalesManager = memo(SalesManager)
export default memoizedSalesManager
