import PropTypes from "prop-types"
import { useState } from "react"
import ViewingOptions from "./ViewingOptions"
import DropDown from "../../components/DropDown"
import PropertiesTitle from "./PropertiesTitle"
import SearchBar from "./SearchBar"
import PropertyList from "./PropertyList"

export function Properties({ properties }) {
  let countryIndex = 0
  let cityIndex = 0
  let countries = []
  let cities = []
  let citiesToProperty = {}
  Object.keys(properties).forEach((property) => {
    if (!countries.includes(properties[property].address.country)) {
      countries[countryIndex] = properties[property].address.country
      countryIndex++
    }
    if (!cities.includes(properties[property].address.city)) {
      cities[cityIndex] = properties[property].address.city
      cityIndex++
      citiesToProperty[properties[property].address.city] = []
    }
    citiesToProperty[properties[property].address.city].push(property)
  })
  cities.sort()
  const statuses = [
    "Developed",
    "Under Development",
    "Leasing Opportunities",
    "Sold",
    "Owned",
  ]
  const [searchParam, setSearchParam] = useState("")
  const [selectedStatus, setSelectedStatus] = useState(
    new Array(statuses.length).fill(false)
  )
  const [selectedCountry, setSelectedCountry] = useState(
    new Array(countries.length).fill(false)
  )
  const [selectedCity, setSelectedCity] = useState(
    new Array(cities.length).fill(false)
  )

  return (
    <div className="properties">
      <PropertiesTitle />
      <SearchBar setSearchParam={setSearchParam} />
      <DropDown
        heading="Viewing Options"
        content={
          <ViewingOptions
            statuses={statuses}
            selectedStatus={selectedStatus}
            setSelectedStatus={setSelectedStatus}
            countries={countries}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            cities={cities}
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
          />
        }
      />
      <PropertyList
        citiesToProperty={citiesToProperty}
        cities={cities}
        countries={countries}
        statuses={statuses}
        selectedCity={selectedCity}
        selectedCountry={selectedCountry}
        selectedStatus={selectedStatus}
        properties={properties}
        searchParam={searchParam}
      />
    </div>
  )
}

Properties.propTypes = {
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
}
