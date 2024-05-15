import PropTypes from "prop-types"

function PropertyPhases({ property, phases }) {
  //needs to be styled like PropertyBuildings
  return (
    <>
      {Object.keys(phases).map((phase) => {
        return (
          <div className="phase-details" key={`${property}_${phase}`}>
            <h2>Phase {phase}</h2>
            <div className="phase-details__container">
              <div className="phase-details__attribute">
                <p className="phase-details__attribute-title">
                  NUMBER OF HOMES
                </p>
                <p className="phase-details__attribute-value">
                  {phase.numHomes}
                </p>
              </div>
              {"numSingle" in phase ? (
                <div className="phase-details__attribute">
                  <p className="phase-details__attribute-title">
                    NUMBER OF SINGLE HOMES
                  </p>
                  <p className="phase-details__attribute-value">
                    {phase.numSingle}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {"numSemi" in phase ? (
                <div className="phase-details__attribute">
                  <p className="phase-details__attribute-title">
                    NUMBER OF SEMI HOMES
                  </p>
                  <p className="phase-details__attribute-value">
                    {phase.numSemi}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {"numTownHome" in phase ? (
                <div className="phase-details__attribute">
                  <p className="phase-details__attribute-title">
                    NUMBER OF TOWN HOMES
                  </p>
                  <p className="phase-details__attribute-value">
                    {phase.numTownHome}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {"numCondo" in phase ? (
                <div className="phase-details__attribute">
                  <p className="phase-details__attribute-title">
                    NUMBER OF CONDO UNITS
                  </p>
                  <p className="phase-details__attribute-value">
                    {phase.numCondo}
                  </p>
                </div>
              ) : (
                <></>
              )}
              {"phaseArea" in phase ? (
                <div className="phase-details__attribute">
                  <p className="phase-details__attribute-title">
                    PHASE AREA (ACRES)
                  </p>
                  <p className="phase-details__attribute-value">
                    {phase.phaseArea}
                  </p>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        )
      })}
    </>
  )
}

PropertyPhases.propTypes = {
  phases: PropTypes.objectOf(
    PropTypes.exact({
      numHomes: PropTypes.number.isRequired,
      numSingle: PropTypes.number,
      numSemi: PropTypes.number,
      numTownHome: PropTypes.number,
      numCondo: PropTypes.number,
      phaseArea: PropTypes.number,
    })
  ).isRequired,
  property: PropTypes.string.isRequired,
}

export default PropertyPhases
