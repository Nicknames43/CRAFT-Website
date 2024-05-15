import PropDetailsNonReq from "../../components/PropDetailsNonReq"
import PropTypes from "prop-types"

function ResidentialDetails({ propDetails }) {
  return (
    <div className="property-details">
      <p className="property-details__detail">
        <span className="property-details__title">NUMBER OF HOMES</span>
        {propDetails.totNumHomes}
      </p>
      <PropDetailsNonReq
        prop="totNumSingle"
        title="NUMBER OF SINGLE HOMES"
        propDetails={propDetails}
      />
      <PropDetailsNonReq
        prop="totNumSingle"
        title="NUMBER OF SINGLE HOMES"
        propDetails={propDetails}
      />
      <PropDetailsNonReq
        prop="totNumSemi"
        title="NUMBER OF SEMI HOMES"
        propDetails={propDetails}
      />
      <PropDetailsNonReq
        prop="totNumTownHome"
        title="NUMBER OF TOWN HOMES"
        propDetails={propDetails}
      />
      <PropDetailsNonReq
        prop="totNumCondo"
        title="NUMBER OF CONDO UNITS"
        propDetails={propDetails}
      />
      <PropDetailsNonReq
        prop="siteArea"
        title="SITE AREA (ACRES)"
        propDetails={propDetails}
      />
    </div>
  )
}

ResidentialDetails.propTypes = {
  propDetails: PropTypes.shape({
    totNumHomes: PropTypes.number.isRequired,
  }).isRequired,
}

export default ResidentialDetails
