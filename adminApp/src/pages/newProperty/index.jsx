import ResidentialProperty from "./ResidentialProperty"
import CommercialProperty from "./CommercialProperty"
import PropTypes from "prop-types"

const NewProperty = ({ type }) => {
  if (type === "Residential") {
    return <ResidentialProperty />
  } else if (type === "Commercial") {
    return <CommercialProperty />
  }
  return <p>{type} is not a property type</p>
}

NewProperty.propTypes = {
  type: PropTypes.string.isRequired,
}

export default NewProperty
