import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import {
  useGetPropertiesQuery,
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../../app/api/propertiesApiSlice"
import { useNavigate } from "react-router-dom"
import { PROPERTY_TYPES } from "../../config/propertyTypes"
import PropertyForm from "../../components/PropertyForm"
import ResidentialForm from "../../components/ResidentialForm"
import CommercialForm from "../../components/CommercialForm"
import ImageSelector from "../../components/ImageSelector"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import PulseLoader from "react-spinners/PulseLoader"

const Property = () => {
  const { id } = useParams()
  const { property } = useGetPropertiesQuery("propertiesList", {
    selectFromResult: ({ data }) => ({
      property: data?.entities[id],
    }),
  })
  const [updateProperty, { isLoading, isSuccess, isError, error }] =
    useUpdatePropertyMutation()

  const [deleteProperty, { isSuccess: isDelSuccess }] =
    useDeletePropertyMutation()

  const navigate = useNavigate()

  // States for all properties

  const [published, setPublished] = useState(property?.published ?? false)
  const [featured, setFeatured] = useState(property?.featured ?? false)
  const [name, setName] = useState(property?.name ?? "")
  const [country, setCountry] = useState(property?.country ?? "")
  const [province, setProvince] = useState(property?.province ?? "")
  const [city, setCity] = useState(property?.city ?? "")
  const [streetName, setStreetName] = useState(property?.streetName ?? "")
  const [streetNum, setStreetNum] = useState(property?.streetNum ?? "")
  const [postalCode, setPostalCode] = useState(property?.postalCode ?? "")
  const [latitude, setLatitude] = useState(property?.latitude ?? 0)
  const [longitude, setLongitude] = useState(property?.longitude ?? 0)
  const [description, setDescription] = useState(property?.description ?? "")
  const [siteArea, setSiteArea] = useState(property?.siteArea ?? 0)
  const [developed, setDeveloped] = useState(property?.developed ?? false)
  const [salesManager, setSalesManager] = useState(property?.salesManager ?? "")
  const [salesURL, setSalesURL] = useState(property?.salesURL ?? "")
  const [dateCompleted, setDateCompleted] = useState(
    property?.dateCompleted?.split("T")[0] ?? "yyyy-mm-dd"
  )
  const [imageOrder, setImageOrder] = useState(
    property?.images?.map((image) => {
      return { new: false, id: image }
    }) ?? []
  ) // In the form [{new: true/false, id: url, file: (for new ones)} , ...]

  // States for commercial properties
  const [size, setSize] = useState(property?.size ?? 0)
  const [featuredTenants, setFeaturedTenants] = useState(
    property?.featuredTenants ?? []
  )
  const [leaseSize, setLeaseSize] = useState(property?.leaseSize ?? 0)
  const [type, setType] = useState(property?.type ?? "")

  // States for residential properties
  const [numSingle, setNumSingle] = useState(property?.numSingle ?? 0)
  const [numSemi, setNumSemi] = useState(property?.numSemi ?? 0)
  const [numTownHome, setNumTownHome] = useState(property?.numTownHome ?? 0)
  const [numStacked, setNumStacked] = useState(property?.numStacked ?? 0)
  const [numCondo, setNumCondo] = useState(property?.numCondo ?? 0)

  const onSavePropertyClicked = async () => {
    const data = {
      id: property?.id,
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
    if (dateCompleted !== "YYYY-MM-DD") {
      data.dateCompleted = dateCompleted
    }

    switch (property?.__t) {
      case PROPERTY_TYPES.commercial:
        if (featuredTenants.length > 0) {
          data.featuredTenants = featuredTenants
        }
        if (leaseSize > 0) {
          data.leaseSize = leaseSize
        }
        await updateProperty({ ...data, size, type })
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
        await updateProperty({
          ...data,
        })
        break
      default:
        console.log("Undefined property type")
    }
  }

  const onDeletePropertyClicked = async () => {
    await deleteProperty({ id: property?.id })
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
  if (property?.__t === PROPERTY_TYPES.commercial) {
    canSave = canSave && size > 0 && type
  } else if (property?.__t === PROPERTY_TYPES.residential) {
    canSave =
      canSave &&
      (numSingle > 0 ||
        numSemi > 0 ||
        numTownHome > 0 ||
        numStacked > 0 ||
        numCondo > 0)
  }

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      navigate("/dash/properties")
    }
  }, [isSuccess, isDelSuccess, navigate])

  useEffect(() => {
    setPublished(property?.published ?? false)
    setFeatured(property?.featured ?? false)
    setName(property?.name ?? "")
    setCountry(property?.country ?? "")
    setProvince(property?.province ?? "")
    setCity(property?.city ?? "")
    setStreetName(property?.streetName ?? "")
    setStreetNum(property?.streetNum ?? "")
    setPostalCode(property?.postalCode ?? "")
    setLatitude(property?.latitude ?? 0)
    setLongitude(property?.longitude ?? 0)
    setDescription(property?.description ?? "")
    setSiteArea(property?.siteArea ?? 0)
    setDeveloped(property?.developed ?? false)
    setSalesManager(property?.salesManager ?? "")
    setSalesURL(property?.salesURL ?? "")
    setDateCompleted(property?.dateCompleted?.split("T")[0] ?? "yyyy-mm-dd")
    setImageOrder(
      property?.images?.map((image) => {
        return { new: false, id: image }
      }) ?? []
    )
    setSize(property?.size ?? 0)
    setFeaturedTenants(property?.featuredTenants ?? [])
    setLeaseSize(property?.leaseSize ?? 0)
    setType(property?.type ?? "")
    setNumSingle(property?.numSingle ?? 0)
    setNumSemi(property?.numSemi ?? 0)
    setNumTownHome(property?.numTownHome ?? 0)
    setNumStacked(property?.numStacked ?? 0)
    setNumCondo(property?.numCondo ?? 0)
  }, [
    property?.city,
    property?.country,
    property?.dateCompleted,
    property?.description,
    property?.developed,
    property?.featured,
    property?.featuredTenants,
    property?.images,
    property?.latitude,
    property?.leaseSize,
    property?.longitude,
    property?.name,
    property?.numCondo,
    property?.numSemi,
    property?.numSingle,
    property?.numStacked,
    property?.numTownHome,
    property?.postalCode,
    property?.province,
    property?.published,
    property?.salesManager,
    property?.salesURL,
    property?.siteArea,
    property?.size,
    property?.streetName,
    property?.streetNum,
    property?.type,
  ])

  let additionalFields
  if (!property) {
    return <PulseLoader color="#FFF" />
  } else {
    switch (property?.__t) {
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
  }

  const content = (
    <>
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
export default Property
