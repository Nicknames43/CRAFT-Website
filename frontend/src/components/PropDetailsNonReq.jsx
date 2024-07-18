import PropTypes from "prop-types"

function propDetailsNonReq({ prop, propDetails, title }) {
  if (prop in propDetails) {
    return (
      <p className="property-details__detail">
        <span className="property-details__title">{title}</span>
        {propDetails[prop]}
      </p>
    )
  }
}

propDetailsNonReq.propTypes = {
  prop: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  propDetails: PropTypes.object.isRequired,
}

export default propDetailsNonReq
