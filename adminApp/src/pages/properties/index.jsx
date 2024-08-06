import { useGetPropertiesQuery } from "../../app/api/propertiesApiSlice"
import Property from "./Property"
import { useNavigate } from "react-router-dom"
import PulseLoader from "react-spinners/PulseLoader"

const PropertiesList = () => {
  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPropertiesQuery("propertiesList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  const navigate = useNavigate()
  const handleCreate = () => navigate(`/dash/properties/new`)

  let content
  if (isLoading) {
    content = <PulseLoader color={"#FFF"} />
  }
  if (isError) {
    content = (
      <>
        <button title="Create" onClick={handleCreate}>
          New Property
        </button>
        <p className="errmsg">{error?.data?.message}</p>
      </>
    )
  }
  if (isSuccess) {
    const { ids } = properties

    const tableContent = ids?.length
      ? ids.map((propertyId) => (
          <Property key={propertyId} propertyId={propertyId} />
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
            <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z" />
          </svg>
          <p>New Property</p>
        </button>
        <table className="table table--properties">
          <thead className="table__thead">
            <tr>
              <th scope="col" className="table__th property__name">
                Name
              </th>
              <th scope="col" className="table__th property__published">
                Published
              </th>
              <th scope="col" className="table__th property__featured">
                Featured
              </th>
              <th scope="col" className="table__th property__status">
                Status
              </th>
              <th scope="col" className="table__th property__type">
                Type
              </th>
              <th scope="col" className="table__th property__edit">
                Edit
              </th>
              <th scope="col" className="table__th property__delete">
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
export default PropertiesList
