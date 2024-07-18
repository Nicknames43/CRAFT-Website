import { useGetPropertiesQuery } from "../../app/api/propertiesApiSlice"
import Property from "./Property"
import { useNavigate } from "react-router-dom"

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
    content = <p>Loading...</p>
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
        <button title="Create" onClick={handleCreate}>
          New Property
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
              <th scope="col" className="table__th property__edit">
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
