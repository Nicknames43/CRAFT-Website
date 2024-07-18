import { useGetSalesManagersQuery } from "../app/api/salesManagersApiSlice"
import SalesManagerOption from "./SalesManagerOption"
import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const PropertyForm = ({
  isError,
  error,
  published,
  setPublished,
  featured,
  setFeatured,
  name,
  setName,
  country,
  setCountry,
  province,
  setProvince,
  city,
  setCity,
  streetName,
  setStreetName,
  streetNum,
  setStreetNum,
  postalCode,
  setPostalCode,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  description,
  setDescription,
  siteArea,
  setSiteArea,
  developed,
  setDeveloped,
  salesManager,
  setSalesManager,
  salesURL,
  setSalesURL,
  dateCompleted,
  setDateCompleted,
}) => {
  const {
    data: salesManagers,
    isLoading: isGetLoading,
    isSuccess: isGetSuccess,
    isError: isGetError,
  } = useGetSalesManagersQuery("salesManagersList", {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  })
  const [publishedErr, setPublishedErr] = useState(isError)
  const [featuredErr, setFeaturedErr] = useState(isError)
  const [nameErr, setNameErr] = useState(isError)
  const [countryErr, setCountryErr] = useState(isError)
  const [provinceErr, setProvinceErr] = useState(isError)
  const [cityErr, setCityErr] = useState(isError)
  const [streetNameErr, setStreetNameErr] = useState(isError)
  const [streetNumErr, setStreetNumErr] = useState(isError)
  const [postalCodeErr, setPostalCodeErr] = useState(isError)
  const [latitudeErr, setLatitudeErr] = useState(isError)
  const [longitudeErr, setLongitudeErr] = useState(isError)
  const [descriptionErr, setDescriptionErr] = useState(isError)
  const [siteAreaErr, setSiteAreaErr] = useState(isError)
  const [developedErr, setDevelopedErr] = useState(isError)
  const [salesManagerErr, setSalesManagerErr] = useState(isError)
  const [salesURLErr, setSalesURLErr] = useState(isError)
  const [dateCompletedErr, setDateCompletedErr] = useState(isError)

  const onPublishedChanged = () => setPublished(!published)
  const onFeaturedChanged = () => setFeatured(!featured)
  const onNameChanged = (event) => setName(event.target.value)
  const onCountryChanged = (event) => setCountry(event.target.value)
  const onProvinceChanged = (event) => setProvince(event.target.value)
  const onCityChanged = (event) => setCity(event.target.value)
  const onStreetNameChanged = (event) => setStreetName(event.target.value)
  const onStreetNumChanged = (event) => setStreetNum(event.target.value)
  const onPostalCodeChanged = (event) => setPostalCode(event.target.value)
  const onLatitudeChanged = (event) => setLatitude(Number(event.target.value))
  const onLongitudeChanged = (event) => setLongitude(Number(event.target.value))
  const onDescriptionChanged = (event) => setDescription(event.target.value)
  const onSiteAreaChanged = (event) => setSiteArea(Number(event.target.value))
  const onDevelopedChanged = () => setDeveloped(!developed)
  const onSalesManagerChanged = (event) => setSalesManager(event.target.value)
  const onSalesURLChanged = (event) => setSalesURL(event.target.value)
  const onDateCompletedChanged = (event) => setDateCompleted(event.target.value)

  useEffect(() => {
    setPublishedErr(isError)
    setFeaturedErr(isError)
    setNameErr(isError)
    setCountryErr(isError)
    setProvinceErr(isError)
    setCityErr(isError)
    setStreetNameErr(isError)
    setStreetNumErr(isError)
    setPostalCodeErr(isError)
    setLatitudeErr(isError)
    setLongitudeErr(isError)
    setDescriptionErr(isError)
    setSiteAreaErr(isError)
    setDevelopedErr(isError)
    setSalesManagerErr(isError)
    setSalesURLErr(isError)
    setDateCompletedErr(isError)
  }, [isError])

  useEffect(() => {
    setPublishedErr(false)
  }, [published])

  useEffect(() => {
    setFeaturedErr(false)
  }, [featured])

  useEffect(() => {
    setNameErr(false)
  }, [name])

  useEffect(() => {
    setCountryErr(false)
  }, [country])

  useEffect(() => {
    setProvinceErr(false)
  }, [province])

  useEffect(() => {
    setCityErr(false)
  }, [city])

  useEffect(() => {
    setStreetNameErr(false)
  }, [streetName])

  useEffect(() => {
    setStreetNumErr(false)
  }, [streetNum])

  useEffect(() => {
    setPostalCodeErr(false)
  }, [postalCode])

  useEffect(() => {
    setLatitudeErr(false)
  }, [latitude])

  useEffect(() => {
    setLongitudeErr(false)
  }, [longitude])

  useEffect(() => {
    setDescriptionErr(false)
  }, [description])

  useEffect(() => {
    setSiteAreaErr(false)
  }, [siteArea])

  useEffect(() => {
    setDevelopedErr(false)
  }, [developed])

  useEffect(() => {
    setSalesManagerErr(false)
  }, [salesManager])

  useEffect(() => {
    setSalesURLErr(false)
  }, [salesURL])

  useEffect(() => {
    setDateCompletedErr(false)
  }, [dateCompleted])

  let salesManagersSelect
  let content

  if (isGetLoading) content = <p>Loading...</p>

  if (isGetError) salesManagersSelect = <></>

  if (isGetSuccess) {
    const { ids: salesManagersIds } = salesManagers
    if (salesManagersIds?.length > 0) {
      salesManagersSelect = (
        <>
          <label className="form__label" htmlFor="salesManager">
            SalesManager:{" "}
            <span
              className={`nowrap ${salesManagerErr ? "errmsg" : "noerrmsg"}`}
            >
              {error?.salesManager ?? ""}
            </span>
          </label>
          <select
            id="salesManager"
            value={salesManager}
            onChange={onSalesManagerChanged}
          >
            <option value="">No sales manager</option>
            {salesManagersIds.map((salesManagerId) => {
              return (
                <SalesManagerOption
                  key={`salesManager${salesManagerId}`}
                  salesManagerId={salesManagerId}
                />
              )
            })}
          </select>
        </>
      )
    } else {
      salesManagersSelect = <></>
    }
  }

  content = (
    <>
      <label className="form__label" htmlFor="published">
        Published:{" "}
        <span className={`nowrap ${publishedErr ? "errmsg" : "noerrmsg"}`}>
          {error?.published ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="published"
        name="published"
        type="checkbox"
        autoComplete="off"
        checked={published}
        onChange={onPublishedChanged}
      />
      <label className="form__label" htmlFor="featured">
        Featured:{" "}
        <span className={`nowrap ${featuredErr ? "errmsg" : "noerrmsg"}`}>
          {error?.featured ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="featured"
        name="featured"
        type="checkbox"
        autoComplete="off"
        checked={featured}
        onChange={onFeaturedChanged}
      />
      <label className="form__label" htmlFor="name">
        Name:{" "}
        <span className={`nowrap ${nameErr ? "errmsg" : "noerrmsg"}`}>
          {error?.name ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="name"
        name="name"
        type="text"
        autoComplete="off"
        value={name}
        onChange={onNameChanged}
      />
      <label className="form__label" htmlFor="country">
        Country:{" "}
        <span className={`nowrap ${countryErr ? "errmsg" : "noerrmsg"}`}>
          {error?.country ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="country"
        name="country"
        type="text"
        autoComplete="off"
        value={country}
        onChange={onCountryChanged}
      />
      <label className="form__label" htmlFor="province">
        Province:{" "}
        <span className={`nowrap ${provinceErr ? "errmsg" : "noerrmsg"}`}>
          {error?.province ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="province"
        name="province"
        type="text"
        autoComplete="off"
        value={province}
        onChange={onProvinceChanged}
      />
      <label className="form__label" htmlFor="city">
        City:{" "}
        <span className={`nowrap ${cityErr ? "errmsg" : "noerrmsg"}`}>
          {error?.city ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="city"
        name="city"
        type="text"
        autoComplete="off"
        value={city}
        onChange={onCityChanged}
      />
      <label className="form__label" htmlFor="streetName">
        StreetName:{" "}
        <span className={`nowrap ${streetNameErr ? "errmsg" : "noerrmsg"}`}>
          {error?.streetName ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="streetName"
        name="streetName"
        type="text"
        autoComplete="off"
        value={streetName}
        onChange={onStreetNameChanged}
      />
      <label className="form__label" htmlFor="streetNum">
        StreetNum:{" "}
        <span className={`nowrap ${streetNumErr ? "errmsg" : "noerrmsg"}`}>
          {error?.streetNum ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="streetNum"
        name="streetNum"
        type="text"
        autoComplete="off"
        value={streetNum}
        onChange={onStreetNumChanged}
      />
      <label className="form__label" htmlFor="postalCode">
        PostalCode:{" "}
        <span className={`nowrap ${postalCodeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.postalCode ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="postalCode"
        name="postalCode"
        type="text"
        autoComplete="off"
        value={postalCode}
        onChange={onPostalCodeChanged}
      />
      <label className="form__label" htmlFor="latitude">
        Latitude:{" "}
        <span className={`nowrap ${latitudeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.latitude ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="latitude"
        name="latitude"
        type="number"
        autoComplete="off"
        value={latitude}
        onChange={onLatitudeChanged}
      />
      <label className="form__label" htmlFor="longitude">
        Longitude:{" "}
        <span className={`nowrap ${longitudeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.longitude ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="longitude"
        name="longitude"
        type="number"
        autoComplete="off"
        value={longitude}
        onChange={onLongitudeChanged}
      />
      <label className="form__label" htmlFor="description">
        Description:{" "}
        <span className={`nowrap ${descriptionErr ? "errmsg" : "noerrmsg"}`}>
          {error?.description ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="description"
        name="description"
        type="text"
        autoComplete="off"
        value={description}
        onChange={onDescriptionChanged}
      />
      <label className="form__label" htmlFor="siteArea">
        SiteArea:{" "}
        <span className={`nowrap ${siteAreaErr ? "errmsg" : "noerrmsg"}`}>
          {error?.siteArea ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="siteArea"
        name="siteArea"
        type="number"
        autoComplete="off"
        value={siteArea}
        onChange={onSiteAreaChanged}
      />
      <label className="form__label" htmlFor="developed">
        Developed:{" "}
        <span className={`nowrap ${developedErr ? "errmsg" : "noerrmsg"}`}>
          {error?.developed ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="developed"
        name="developed"
        type="checkbox"
        autoComplete="off"
        checked={developed}
        onChange={onDevelopedChanged}
      />
      {salesManagersSelect}
      <label className="form__label" htmlFor="salesURL">
        SalesURL:{" "}
        <span className={`nowrap ${salesURLErr ? "errmsg" : "noerrmsg"}`}>
          {error?.salesURL ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="salesURL"
        name="salesURL"
        type="text"
        autoComplete="off"
        value={salesURL}
        onChange={onSalesURLChanged}
      />
      <label className="form__label" htmlFor="dateCompleted">
        DateCompleted:{" "}
        <span className={`nowrap ${dateCompletedErr ? "errmsg" : "noerrmsg"}`}>
          {error?.dateCompleted ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="dateCompleted"
        name="dateCompleted"
        type="date"
        autoComplete="off"
        value={dateCompleted}
        onChange={onDateCompletedChanged}
      />
    </>
  )

  return content
}

export default PropertyForm

PropertyForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  published: PropTypes.bool.isRequired,
  setPublished: PropTypes.func.isRequired,
  featured: PropTypes.bool.isRequired,
  setFeatured: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  country: PropTypes.string.isRequired,
  setCountry: PropTypes.func.isRequired,
  province: PropTypes.string.isRequired,
  setProvince: PropTypes.func.isRequired,
  city: PropTypes.string.isRequired,
  setCity: PropTypes.func.isRequired,
  streetName: PropTypes.string.isRequired,
  setStreetName: PropTypes.func.isRequired,
  streetNum: PropTypes.string.isRequired,
  setStreetNum: PropTypes.func.isRequired,
  postalCode: PropTypes.string.isRequired,
  setPostalCode: PropTypes.func.isRequired,
  latitude: PropTypes.number.isRequired,
  setLatitude: PropTypes.func.isRequired,
  longitude: PropTypes.number.isRequired,
  setLongitude: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  setDescription: PropTypes.func.isRequired,
  siteArea: PropTypes.number.isRequired,
  setSiteArea: PropTypes.func.isRequired,
  developed: PropTypes.bool.isRequired,
  setDeveloped: PropTypes.func.isRequired,
  salesManager: PropTypes.string.isRequired,
  setSalesManager: PropTypes.func.isRequired,
  salesURL: PropTypes.string.isRequired,
  setSalesURL: PropTypes.func.isRequired,
  dateCompleted: PropTypes.string.isRequired,
  setDateCompleted: PropTypes.func.isRequired,
}
