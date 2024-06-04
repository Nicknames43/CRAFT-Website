import { useGetPropertiesQuery } from "../../app/api/propertiesApiSlice"
import Property from "./Property"

const PropertiesList = () => {
  const {
    data: properties,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetPropertiesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = properties

    const tableContent = ids?.length
      ? ids.map((propertyId) => (
          <Property key={propertyId} propertyId={propertyId} />
        ))
      : null

    content = (
      <table className="table table--properties">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__th property__name">
              Name
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
          </tr>
        </thead>
        <tbody>{tableContent}</tbody>
      </table>
    )
  }

  return content
}
export default PropertiesList
