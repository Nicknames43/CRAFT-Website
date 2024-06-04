import { useState, useEffect } from "react"
import {
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../../app/api/propertiesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import { STATUSES } from "../../config/statuses"

const EditResidentialForm = ({ property }) => {
  const [updateProperty, { isLoading, isSuccess, isError, error }] =
    useUpdatePropertyMutation()

  const [
    deleteProperty,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeletePropertyMutation()

  const navigate = useNavigate()

  const [name, setName] = useState(property.name)
  const [country, setCountry] = useState(property.country)
  const [province, setProvince] = useState(property.province)
  const [city, setCity] = useState(property.city)
  const [streetName, setStreetName] = useState(property.streetName)
  const [streetNum, setStreetNum] = useState(property.streetNum)
  const [postalCode, setPostalCode] = useState(property.postalCode)
  const [status, setStatus] = useState(property.status)

  const [residentialType, setResidentialType] = useState(
    property.residentialType
  )
  const [purchasable, setPurchasable] = useState(property.purchasable)
  const [phases, setPhases] = useState(property.phases)

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess || isDelSuccess) {
      setName("")
      navigate("/dash/properties")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onNameChanged = (event) => setName(event.target.value)
  const onCountryChanged = (event) => setCountry(event.target.value)
  const onProvinceChanged = (event) => setProvince(event.target.value)
  const onCityChanged = (event) => setCity(event.target.value)
  const onStreetNameChanged = (event) => setStreetName(event.target.value)
  const onStreetNumChanged = (event) => setStreetNum(event.target.value)
  const onPostalCodeChanged = (event) => setPostalCode(event.target.value)
  const onStatusChanged = (event) => {
    if (status.includes(event.target.name)) {
      setStatus((status) => status.filter((s) => s !== event.target.name))
    } else {
      setStatus([...status, event.target.name])
    }
  }
  const onResidentialTypeChanged = (event) =>
    setResidentialType(event.target.value)
  const onPurchasableChanged = (event) => setPurchasable(!purchasable)

  const onPhaseChanged = (index, event) => {
    let data = [...phases]
    if (event.target.name === "phaseName") {
      data[index].phaseName = event.target.value
    } else if (event.target.name === "approved") {
      data[index].approved = !data[index].approved
    } else {
      if (
        event.target.name !== "phaseArea" &&
        event.target.name in data[index]
      ) {
        data[index].numHomes +=
          event.target.valueAsNumber - data[index][event.target.name]
      }
      data[index][event.target.name] = event.target.valueAsNumber
    }
    setPhases(data)
  }

  const addPhase = () => {
    let newPhase = { phaseName: "", approved: false, numHomes: 0, phaseArea: 0 }

    setPhases([...phases, newPhase])
  }

  const onSavePropertyClicked = async () => {
    await updateProperty({ id: property.id, name })
  }

  const onDeletePropertyClicked = async () => {
    await deleteProperty({ id: property.id })
  }

  // let canSave
  // if (password) {
  //   canSave = roles.length && validName && validPassword && !isLoading
  // } else {
  //   canSave = roles.length && validName && !isLoading
  // }

  const errClass = isError || isDelError ? "errmsg" : "offscreen"
  // const validPropertyClass = !validName ? "form__input--incomplete" : ""

  const errContent = (error?.data?.message || delerror?.data?.message) ?? ""

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Property</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSavePropertyClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeletePropertyClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="name">
          Name: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="name"
          name="name"
          type="text"
          autoComplete="off"
          value={name}
          onChange={onNameChanged}
        />
        <label className="form__label" htmlFor="country">
          Country: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="country"
          name="country"
          type="text"
          autoComplete="off"
          value={country}
          onChange={onCountryChanged}
        />
        <label className="form__label" htmlFor="province">
          Province: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="province"
          name="province"
          type="text"
          autoComplete="off"
          value={province}
          onChange={onProvinceChanged}
        />
        <label className="form__label" htmlFor="city">
          City: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="city"
          name="city"
          type="text"
          autoComplete="off"
          value={city}
          onChange={onCityChanged}
        />
        <label className="form__label" htmlFor="streetName">
          StreetName: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="streetName"
          name="streetName"
          type="text"
          autoComplete="off"
          value={streetName}
          onChange={onStreetNameChanged}
        />
        <label className="form__label" htmlFor="streetNum">
          StreetNum: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="streetNum"
          name="streetNum"
          type="text"
          autoComplete="off"
          value={streetNum}
          onChange={onStreetNumChanged}
        />
        <label className="form__label" htmlFor="postalCode">
          PostalCode: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="postalCode"
          name="postalCode"
          type="text"
          autoComplete="off"
          value={postalCode}
          onChange={onPostalCodeChanged}
        />
        <label className="form__label" htmlFor="residentialType">
          Type: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validPropertyClass}`}
          id="residentialType"
          name="residentialType"
          type="text"
          autoComplete="off"
          value={residentialType}
          onChange={onResidentialTypeChanged}
        />
        {STATUSES.map((sts, index) => {
          return (
            <div key={`status-${index}`}>
              <label className="form__label" htmlFor={sts}>
                {sts}
              </label>
              <input
                type="checkbox"
                id={sts}
                name={sts}
                checked={status.includes(sts)}
                onChange={onStatusChanged}
              />
            </div>
          )
        })}
      </form>
    </>
  )

  return content
}

export default EditResidentialForm
