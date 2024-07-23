import { useGetSalesManagersQuery } from "../app/api/salesManagersApiSlice"
import PropTypes from "prop-types"

const SalesManagerOption = ({ salesManagerId }) => {
  const { salesManager } = useGetSalesManagersQuery("salesManagersList", {
    selectFromResult: ({ data }) => ({
      salesManager: data?.entities[salesManagerId],
    }),
  })
  if (salesManager) {
    return (
      <option
        value={salesManagerId}
      >{`${salesManager.name} - ${salesManager.phone} - ${salesManager.email}`}</option>
    )
  } else {
    return <></>
  }
}

SalesManagerOption.propTypes = {
  salesManagerId: PropTypes.string.isRequired,
}

export default SalesManagerOption
