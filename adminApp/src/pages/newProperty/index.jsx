import { useState, useEffect } from "react"
import { useAddNewPropertyMutation } from "../../app/api/propertiesApiSlice"
import { useNavigate } from "react-router-dom"
import { PROPERTY_TYPES } from "../../config/propertyTypes"
import PropertyForm from "../../components/PropertyForm"
import ResidentialForm from "../../components/ResidentialForm"
import CommercialForm from "../../components/CommercialForm"
import ImageSelector from "../../components/ImageSelector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

const NewProperty = () => {
  const [addNewProperty, { isLoading, isSuccess, isError, error }] =
    useAddNewPropertyMutation()

  const navigate = useNavigate()

  // States for all properties
  const [t, setT] = useState(PROPERTY_TYPES.commercial)
  const [published, setPublished] = useState(false)
  const [featured, setFeatured] = useState(false)
  const [name, setName] = useState("")
  const [country, setCountry] = useState("")
  const [province, setProvince] = useState("")
  const [city, setCity] = useState("")
  const [streetName, setStreetName] = useState("")
  const [streetNum, setStreetNum] = useState("")
  const [postalCode, setPostalCode] = useState("")
  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [description, setDescription] = useState("")
  const [siteArea, setSiteArea] = useState(0)
  const [developed, setDeveloped] = useState(false)
  const [salesManager, setSalesManager] = useState("")
  const [salesURL, setSalesURL] = useState("")
  const [dateCompleted, setDateCompleted] = useState("yyyy-mm-dd")
  const [imageOrder, setImageOrder] = useState([])

  // States for commercial properties
  const [size, setSize] = useState(0)
  const [featuredTenants, setFeaturedTenants] = useState([])
  const [leaseSize, setLeaseSize] = useState(0)
  const [type, setType] = useState("")

  // States for residential properties
  const [numSingle, setNumSingle] = useState(0)
  const [numSemi, setNumSemi] = useState(0)
  const [numTownHome, setNumTownHome] = useState(0)
  const [numStacked, setNumStacked] = useState(0)
  const [numCondo, setNumCondo] = useState(0)

  const [tErr, setTErr] = useState(isError)

  useEffect(() => {
    setTErr(isError)
  }, [isError])

  useEffect(() => {
    setTErr(false)
  }, [t])

  const onTChanged = (event) => setT(event.target.value)

  const onCreatePropertyClicked = async () => {
    const data = {
      t,
      published,
      featured,
      name,
      country,
      province,
      city,
      streetName,
      streetNum,
      postalCode,
      latitude,
      longitude,
      description,
      siteArea,
      developed,
      imageOrder,
    }

    if (salesManager !== "") {
      data.salesManager = salesManager
    }
    if (salesURL !== "") {
      data.salesURL = salesURL
    }
    if (dateCompleted !== "Yyyyy-mm-dd") {
      data.dateCompleted = dateCompleted
    }

    switch (t) {
      case PROPERTY_TYPES.commercial:
        if (featuredTenants.length > 0) {
          data.featuredTenants = featuredTenants
        }
        if (leaseSize > 0) {
          data.leaseSize = leaseSize
        }
        await addNewProperty({ ...data, size, type })
        break
      case PROPERTY_TYPES.residential:
        if (numSingle > 0) {
          data.numSingle = numSingle
        }
        if (numSemi > 0) {
          data.numSemi = numSemi
        }
        if (numTownHome > 0) {
          data.numTownHome = numTownHome
        }
        if (numStacked > 0) {
          data.numStacked = numStacked
        }
        if (numCondo > 0) {
          data.numCondo = numCondo
        }
        await addNewProperty({
          ...data,
        })
        break
      default:
        console.log("Undefined property type")
    }
  }

  let canSave =
    !isLoading &&
    name &&
    country &&
    province &&
    city &&
    streetName &&
    streetNum &&
    postalCode &&
    -90 <= latitude &&
    latitude <= 90 &&
    -180 <= longitude &&
    longitude < 180 &&
    description &&
    siteArea > 0
  if (t === PROPERTY_TYPES.commercial) {
    canSave = canSave && size > 0 && type
  } else if (t === PROPERTY_TYPES.residential) {
    canSave =
      canSave &&
      (numSingle > 0 ||
        numSemi > 0 ||
        numTownHome > 0 ||
        numStacked > 0 ||
        numCondo > 0)
  } else {
    canSave = false
  }

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      navigate("/dash/properties")
    }
  }, [isSuccess, navigate])

  let additionalFields
  switch (t) {
    case PROPERTY_TYPES.commercial:
      additionalFields = (
        <CommercialForm
          isError={isError ?? false}
          error={error?.data ?? {}}
          size={size}
          setSize={setSize}
          featuredTenants={featuredTenants}
          setFeaturedTenants={setFeaturedTenants}
          leaseSize={leaseSize}
          setLeaseSize={setLeaseSize}
          type={type}
          setType={setType}
        />
      )
      break
    case PROPERTY_TYPES.residential:
      additionalFields = (
        <ResidentialForm
          isError={isError ?? false}
          error={error?.data ?? {}}
          numSingle={numSingle}
          setNumSingle={setNumSingle}
          numSemi={numSemi}
          setNumSemi={setNumSemi}
          numTownHome={numTownHome}
          setNumTownHome={setNumTownHome}
          numStacked={numStacked}
          setNumStacked={setNumStacked}
          numCondo={numCondo}
          setNumCondo={setNumCondo}
        />
      )
      break
    default:
      return <p>No such property type exists</p>
  }

  const content = (
    <>
      <form className="form" onSubmit={(event) => event.preventDefault()}>
        <div className="form__title-row">
          <h2>Create New Property</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onCreatePropertyClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className="form__label" htmlFor="t">
          Property Type:{" "}
          <span className={`nowrap ${tErr ? "errmsg" : "noerrmsg"}`}>
            {error?.numSingle ?? ""}
          </span>
        </label>
        <select id="t" name="t" value={t} onChange={onTChanged}>
          {Object.entries(PROPERTY_TYPES).map(([key, value]) => (
            <option key={key} value={value}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
        <PropertyForm
          isError={isError ?? false}
          error={error?.data ?? {}}
          published={published}
          setPublished={setPublished}
          featured={featured}
          setFeatured={setFeatured}
          name={name}
          setName={setName}
          country={country}
          setCountry={setCountry}
          province={province}
          setProvince={setProvince}
          city={city}
          setCity={setCity}
          streetName={streetName}
          setStreetName={setStreetName}
          streetNum={streetNum}
          setStreetNum={setStreetNum}
          postalCode={postalCode}
          setPostalCode={setPostalCode}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
          description={description}
          setDescription={setDescription}
          siteArea={siteArea}
          setSiteArea={setSiteArea}
          developed={developed}
          setDeveloped={setDeveloped}
          salesManager={salesManager}
          setSalesManager={setSalesManager}
          salesURL={salesURL}
          setSalesURL={setSalesURL}
          dateCompleted={dateCompleted}
          setDateCompleted={setDateCompleted}
        />
        {additionalFields}
        <ImageSelector imageOrder={imageOrder} setImageOrder={setImageOrder} />
      </form>
    </>
  )

  return content
}
export default NewProperty
