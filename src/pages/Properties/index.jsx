import PropTypes from "prop-types"
import { useState } from "react"

export function Properties({ properties }) {
  const [searchParam, setSearchParam] = useState("")
  const [selectedStatus, setSelectedStatus] = useState([])
  const [selectedCountry, setSelectedCountry] = useState([])
  const [selectedCity, setSelectedCity] = useState([])

  return <></>
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
