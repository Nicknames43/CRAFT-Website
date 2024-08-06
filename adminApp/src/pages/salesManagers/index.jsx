import { useGetSalesManagersQuery } from "../../app/api/salesManagersApiSlice"
import { useNavigate } from "react-router-dom"
import SalesManager from "./SalesManager"
import PulseLoader from "react-spinners/PulseLoader"

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

  if (isLoading) content = <PulseLoader color={"#FFF"} />

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
        <button onClick={handleCreate}>
          <svg
            className="icon-button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 640 512"
          >
            <path d="M96 482.3zM504 312l0-64-64 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l64 0 0-64c0-13.3 10.7-24 24-24s24 10.7 24 24l0 64 64 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-64 0 0 64c0 13.3-10.7 24-24 24s-24-10.7-24-24z" />
            <path d="M96 128a128 128 0 1 0 256 0A128 128 0 1 0 96 128zm94.5 200.2l18.6 31L175.8 483.1l-36-146.9c-2-8.1-9.8-13.4-17.9-11.3C51.9 342.4 0 405.8 0 481.3c0 17 13.8 30.7 30.7 30.7l131.7 0c0 0 0 0 .1 0l5.5 0 112 0 5.5 0c0 0 0 0 .1 0l131.7 0c17 0 30.7-13.8 30.7-30.7c0-75.5-51.9-138.9-121.9-156.4c-8.1-2-15.9 3.3-17.9 11.3l-36 146.9L238.9 359.2l18.6-31c6.4-10.7-1.3-24.2-13.7-24.2L224 304l-19.7 0c-12.4 0-20.1 13.6-13.7 24.2z" />
          </svg>{" "}
          <p>New Sales Manager</p>
        </button>
        <table className="table table--sales-managers">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th sales-manager__name">
                Name
              </th>
              <th scope="col" className="table__th sales-manager__phone">
                Phone
              </th>
              <th scope="col" className="table__th sales-manager__email">
                Email
              </th>
              <th scope="col" className="table__th sales-manager__edit">
                Edit
              </th>
              <th scope="col" className="table__th sales-manager__delete">
                Delete
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
