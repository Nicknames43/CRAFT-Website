import { selectSalesManagerById } from "../app/api/salesManagersApiSlice"
import { useSelector } from "react-redux"
import PropTypes from "prop-types"

const SalesManagerOption = ({ salesManagerId }) => {
  const salesManager = useSelector((state) =>
    selectSalesManagerById(state, salesManagerId)
  )
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
