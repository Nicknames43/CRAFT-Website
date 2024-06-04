import { useState, useEffect } from "react"
import {
  useUpdatePropertyMutation,
  useDeletePropertyMutation,
} from "../../app/api/propertiesApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const EditCommercialForm = ({ property }) => {
  return <div>EditCommercialForm</div>
}

export default EditCommercialForm
