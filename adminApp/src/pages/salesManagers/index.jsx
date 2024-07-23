import { useGetSalesManagersQuery } from "../../app/api/salesManagersApiSlice"
import { useNavigate } from "react-router-dom"
import SalesManager from "./SalesManager"

const SalesManagersList = () => {
  const {
    data: salesManagers,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetSalesManagersQuery("salesManagersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()
  const handleCreate = () => navigate(`/dash/salesManagers/new`)

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = salesManagers

    const tableContent = ids?.length
      ? ids.map((salesManagerId) => (
          <SalesManager key={salesManagerId} salesManagerId={salesManagerId} />
        ))
      : null

    content = (
      <>
        <button title="Create" onClick={handleCreate}>
          New Sales Manager
        </button>
        <table className="table table--salesManagers">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th salesManager__name">
                Name
              </th>
              <th scope="col" className="table__th salesManager__roles">
                Phone
              </th>
              <th scope="col" className="table__th salesManager__roles">
                Email
              </th>
              <th scope="col" className="table__th salesManager__edit">
                Edit
              </th>
            </tr>
          </thead>
          <tbody>{tableContent}</tbody>
        </table>
      </>
    )
  }

  return content
}
export default SalesManagersList
