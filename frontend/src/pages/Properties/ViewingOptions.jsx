import PropTypes from "prop-types"
import Checkbox from "../../components/Checkbox"

function ViewingOptions({
  statuses,
  selectedStatus,
  setSelectedStatus,
  countries,
  selectedCountry,
  setSelectedCountry,
  cities,
  selectedCity,
  setSelectedCity,
}) {
  return (
    <div className="viewing-options">
      <h2 className="viewing-options__title">Select Property Status</h2>
      <div className="viewing-options__container">
        {statuses.map((status, index) => {
          return (
            <Checkbox
              key={status}
              value={status}
              position={index}
              allChecked={selectedStatus}
              setAllChecked={setSelectedStatus}
            />
          )
        })}
      </div>
      <h2 className="viewing-options__title">Select Countries</h2>
      <div className="viewing-options__container">
        {countries.map((country, index) => {
          return (
            <Checkbox
              key={country}
              value={country}
              position={index}
              allChecked={selectedCountry}
              setAllChecked={setSelectedCountry}
            />
          )
        })}
      </div>
      <h2 className="viewing-options__title">Select Cities</h2>
      <div className="viewing-options__container">
        {cities.map((city, index) => {
          return (
            <Checkbox
              key={city}
              value={city}
              position={index}
              allChecked={selectedCity}
              setAllChecked={setSelectedCity}
            />
          )
        })}
      </div>
    </div>
  )
}

ViewingOptions.propTypes = {
  statuses: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedStatus: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelectedStatus: PropTypes.func.isRequired,
  countries: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCountry: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelectedCountry: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCity: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setSelectedCity: PropTypes.func.isRequired,
}

export default ViewingOptions
