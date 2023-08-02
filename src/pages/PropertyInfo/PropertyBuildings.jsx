import PropTypes from "prop-types"
import React from "react"

function PropertyBuildings({ property, buildings }) {
  //make __container a grid layout using: grid-template-columns: 1fr 2fr 2fr;
  return (
    <>
      {Object.keys(buildings).map((building) => {
        return (
          <div className="building-details" key={`${property}_${building}`}>
            <h2 className="building-details__title">Building {building}</h2>
            <div className="building-details__container">
              <p className="building-details__attribute-title">UNIT</p>
              <p className="building-details__attribute-title">TENANT NAME</p>
              <p className="building-details__attribute-title">TOTAL SPACE</p>
              {buildings[building].map((elem) => {
                return (
                  <React.Fragment key={`${property}_${building}_${elem.unit}`}>
                    <p className="building-details__attribute-value">
                      {elem.unit}
                    </p>
                    <p className="building-details__attribute-value">
                      {elem.tenant}
                    </p>
                    <p className="building-details__attribute-value">
                      {elem.lease
                        ? `${elem.space} sq ft available for lease`
                        : `${elem.space} sq ft`}
                    </p>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}

PropertyBuildings.propTypes = {
  buildings: PropTypes.objectOf(
    PropTypes.arrayOf(
      PropTypes.exact({
        unit: PropTypes.string.isRequired,
        tenant: PropTypes.string.isRequired,
        space: PropTypes.number.isRequired,
        lease: PropTypes.bool.isRequired,
      }).isRequired
    ).isRequired
  ).isRequired,
  property: PropTypes.string.isRequired,
}

export default PropertyBuildings
