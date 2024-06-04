import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectPropertyById } from "../../app/api/propertiesApiSlice"
import EditResidentialForm from "./EditResidentialForm"
import EditCommercialForm from "./EditCommercialForm"

const Property = () => {
  const { id } = useParams()

  const property = useSelector((state) => selectPropertyById(state, id))

  const content = !property ? (
    <p>Loading...</p>
  ) : property?.type === "Residential" ? (
    <EditResidentialForm property={property} />
  ) : property?.type === "Commercial" ? (
    <EditCommercialForm property={property} />
  ) : (
    <p>Not a valid property type</p>
  )

  return content
}
export default Property
