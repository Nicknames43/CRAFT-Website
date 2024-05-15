import PropTypes from "prop-types"
import PropertyListing from "./PropertyListing"

function PropertyList({
  cities,
  countries,
  statuses,
  selectedCity,
  selectedCountry,
  selectedStatus,
  properties,
  searchParam,
  citiesToProperty,
}) {
  let numDisplayed = 0
  let selectedCitiesString = ""
  let selectedCountriesString = ""
  let selectedStatusesString = ""

  function validateStatus(property) {
    let numFalse = 0
    for (let i = 0; i < selectedStatus.length; i++) {
      if (selectedStatus[i] && property.status.includes(statuses[i])) {
        return true
      } else if (!selectedStatus[i]) {
        numFalse++
      }
    }
    if (numFalse === selectedStatus.length) {
      return true
    }
    return false
  }

  function validateAddress(property, key, selectedList, values) {
    let numFalse = 0
    for (let i = 0; i < selectedList.length; i++) {
      if (selectedList[i] && property.address[key] === values[i]) {
        return true
      } else if (!selectedList[i]) {
        numFalse++
      }
    }
    if (numFalse === selectedList.length) {
      return true
    }
    return false
  }

  for (let i = 0; i <= cities.length; i++) {
    if (selectedCity[i]) {
      if (selectedCitiesString != "") {
        selectedCitiesString = selectedCitiesString.concat(", ", cities[i])
      } else {
        selectedCitiesString = selectedCitiesString.concat(cities[i])
      }
    }
  }

  for (let i = 0; i <= countries.length; i++) {
    if (selectedCountry[i]) {
      if (selectedCountriesString != "") {
        selectedCountriesString = selectedCountriesString.concat(
          ", ",
          countries[i]
        )
      } else {
        selectedCountriesString = selectedCountriesString.concat(countries[i])
      }
    }
  }

  for (let i = 0; i <= statuses.length; i++) {
    if (selectedStatus[i]) {
      if (selectedStatusesString != "") {
        selectedStatusesString = selectedStatusesString.concat(
          ", ",
          statuses[i]
        )
      } else {
        selectedStatusesString = selectedStatusesString.concat(statuses[i])
      }
    }
  }

  const selectedCities = selectedCity.some((elem) => elem) ? (
    <p className="property-list__option">
      <span className="property-list__option-title">Selected Cities</span>
      {selectedCitiesString}
    </p>
  ) : (
    <></>
  )
  const selectedCountries = selectedCountry.some((elem) => elem) ? (
    <p className="property-list__option">
      <span className="property-list__option-title">Selected Countries</span>
      {selectedCountriesString}
    </p>
  ) : (
    <></>
  )
  const selectedStatuses = selectedStatus.some((elem) => elem) ? (
    <p className="property-list__option">
      <span className="property-list__option-title">
        Selected Property Statuses
      </span>
      {selectedStatusesString}
    </p>
  ) : (
    <></>
  )

  const listedProperties = cities.map((city) => {
    let first = true
    return (
      <>
        {citiesToProperty[city].map((propName) => {
          const prop = properties[propName]

          if (
            validateStatus(prop) &&
            validateAddress(prop, "city", selectedCity, cities) &&
            validateAddress(prop, "country", selectedCountry, countries) &&
            (prop.address.city
              .toLowerCase()
              .includes(searchParam.toLowerCase()) ||
              prop.name.toLowerCase().includes(searchParam.toLowerCase()))
          ) {
            numDisplayed++
            if (first) {
              first = false
              return (
                <>
                  <svg
                    className="property-list__city-banner"
                    viewBox="0 0 2464.298 122.465"
                  >
                    <g id="rectangles" transform="translate(291.934 -2466.768)">
                      <path
                        id="search_section"
                        data-name="search section"
                        d="M-27.847,7986.658H1841.118l-160.449,100H-188.3Z"
                        transform="translate(1949.118 10564.658) rotate(180)"
                        fill="#233682"
                      />
                      <path
                        id="search_section_-_Outline"
                        data-name="search section - Outline"
                        d="M-27.847,7986.658l-160.448,100H1680.67l160.448-100H-27.847m-2.861-10H1876.069l-192.538,120H-223.246Z"
                        transform="translate(1949.118 10564.658) rotate(180)"
                        fill="#233682"
                      />
                      <path
                        id="Path_248"
                        data-name="Path 248"
                        d="M77.8,152.823H393.467L594.739,30.358H279.077"
                        transform="translate(-369.739 2436.411)"
                        fill="#2869a8"
                      />
                    </g>
                    <foreignObject x="600" y="0" width="1400" height="121">
                      <div
                        className="property-list__city-container"
                        xmlns="http://www.w3.org/1999/xhtml"
                      >
                        <p className="property-list__city-text">{city}</p>
                      </div>
                    </foreignObject>
                  </svg>
                  <PropertyListing property={prop} address={propName} />
                  <svg className="property-list__divider" viewBox="0 0 1000 3">
                    <rect
                      x="100"
                      y="0"
                      width="800"
                      height="4"
                      stroke="#233682"
                      strokeWidth="3"
                      transform="skewX(-59)"
                      fill="#233682"
                    />
                  </svg>
                </>
              )
            }
            return (
              <>
                <PropertyListing property={prop} address={propName} />
                <svg className="property-list__divider" viewBox="0 0 1000 3">
                  <rect
                    x="100"
                    y="0"
                    width="800"
                    height="4"
                    stroke="#233682"
                    strokeWidth="3"
                    transform="skewX(-59)"
                    fill="#233682"
                  />
                </svg>
              </>
            )
          }
        })}
      </>
    )
  })

  return (
    <div className="property-list">
      <h1 className="property-list__title">Property List</h1>
      <div className="property-list__selected">
        <p className="property-list__option">
          <span className="property-list__option-title">
            Properties Displayed
          </span>
          {`${numDisplayed} Properties Displayed`}
        </p>
        {selectedCities}
        {selectedCountries}
        {selectedStatuses}
      </div>
      <div className="property-list__listings">{listedProperties}</div>
    </div>
  )
}

PropertyList.propTypes = {
  citiesToProperty: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string))
    .isRequired,
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCity: PropTypes.arrayOf(PropTypes.bool).isRequired,
  selectedCountry: PropTypes.arrayOf(PropTypes.bool).isRequired,
  selectedStatus: PropTypes.arrayOf(PropTypes.bool).isRequired,
  properties: PropTypes.objectOf(
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      salesManager: PropTypes.oneOf([
        PropTypes.string.isRequired,
        PropTypes.exact({
          name: PropTypes.string.isRequired,
          number: PropTypes.string.isRequired,
          email: PropTypes.string.isRequired,
        }),
      ]),
      address: PropTypes.exact({
        country: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        streetName: PropTypes.string.isRequired,
        streetNum: PropTypes.string.isRequired,
        postalCode: PropTypes.string.isRequired,
      }).isRequired,
      status: PropTypes.arrayOf(PropTypes.string).isRequired,
      propDetails: PropTypes.oneOfType([
        PropTypes.exact({
          totSize: PropTypes.number.isRequired,
          leaseSize: PropTypes.number.isRequired,
          siteArea: PropTypes.number,
          tenantMix: PropTypes.string.isRequired,
          featured: PropTypes.arrayOf(PropTypes.string),
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
        }),
        PropTypes.exact({
          totNumHomes: PropTypes.number.isRequired,
          purchasable: PropTypes.bool.isRequired,
          totNumSingle: PropTypes.number,
          totNumSemi: PropTypes.number,
          totNumTownHome: PropTypes.number,
          totNumCondo: PropTypes.number,
          siteArea: PropTypes.number,
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
        }),
      ]).isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
  searchParam: PropTypes.string.isRequired,
}

export default PropertyList
