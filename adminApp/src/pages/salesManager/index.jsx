import { useParams } from "react-router-dom"
import { useGetSalesManagersQuery } from "../../app/api/salesManagersApiSlice"
import SalesManagerForm from "../../components/SalesManagerForm"
import { useState, useEffect } from "react"
import {
  useUpdateSalesManagerMutation,
  useDeleteSalesManagerMutation,
} from "../../app/api/salesManagersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"
import PulseLoader from "react-spinners/PulseLoader"

const SalesManager = () => {
  const { id } = useParams()
  const { salesManager } = useGetSalesManagersQuery("salesManagersList", {
    selectFromResult: ({ data }) => ({
      salesManager: data?.entities[id],
    }),
  })
  const [updateSalesManager, { isLoading, isSuccess, isError, error }] =
    useUpdateSalesManagerMutation()

  const [deleteSalesManager, { isSuccess: isDelSuccess }] =
    useDeleteSalesManagerMutation()

  const navigate = useNavigate()

  const [name, setName] = useState(salesManager?.name ?? "")
  const [phone, setPhone] = useState(salesManager?.phone ?? "")
  const [email, setEmail] = useState(salesManager?.email ?? "")

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setName("")
      setPhone("")
      setEmail(false)
      navigate("/dash/salesManagers")
    }
  }, [isSuccess, isDelSuccess, navigate])

  useEffect(() => {
    setName(salesManager?.name ?? "")
    setPhone(salesManager?.phone ?? "")
    setEmail(salesManager?.email ?? "")
  }, [salesManager?.email, salesManager?.name, salesManager?.phone])

  const onSaveSalesManagerClicked = async () => {
    if (phone) {
      await updateSalesManager({ id: salesManager.id, name, phone, email })
    } else {
      await updateSalesManager({ id: salesManager.id, name, email })
    }
  }

  const onDeleteSalesManagerClicked = async () => {
    await deleteSalesManager({ id: salesManager.id })
  }

  const canSave = email && name && phone && !isLoading

  const content = !salesManager ? (
    <PulseLoader color="#FFF" />
  ) : (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit Sales Manager</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveSalesManagerClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteSalesManagerClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <SalesManagerForm
          isError={isError ?? false}
          error={error?.data ?? {}}
          name={name}
          setName={setName}
          phone={phone}
          setPhone={setPhone}
          email={email}
          setEmail={setEmail}
        />
      </form>
    </>
  )

  return content
}
export default SalesManager
