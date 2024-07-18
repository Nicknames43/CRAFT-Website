import PropDetailsNonReq from "../../components/PropDetailsNonReq"
import PropTypes from "prop-types"

function NonResidentialDetails({ propDetails }) {
  const leaseSize =
    0 < propDetails.leaseSize ? (
      <p className="property-details__detail">
        <span className="property-details__title">
          SQ FT AVAILABLE FOR LEASE
        </span>
        {propDetails.leaseSize}
      </p>
    ) : (
      <></>
    )

  return (
    <div className="property-details">
      <p className="property-details__detail">
        <span className="property-details__title">TOTAL SIZE (SQ FT)</span>
        {propDetails.totSize}
      </p>
      {leaseSize}
      <PropDetailsNonReq
        prop="siteArea"
        title="SITE AREA (ACRES)"
        propDetails={propDetails}
      />
      <p className="property-details__detail">
        <span className="property-details__title">TENANT MIX</span>
        {propDetails.tenantMix}
      </p>
    </div>
  )
}

NonResidentialDetails.propTypes = {
  propDetails: PropTypes.shape({
    totSize: PropTypes.number.isRequired,
    leaseSize: PropTypes.number.isRequired,
    tenantMix: PropTypes.string.isRequired,
    siteArea: PropTypes.number.isRequired,
  }).isRequired,
}

export default NonResidentialDetails
