import { useState, useEffect } from "react"
import { useAddNewSalesManagerMutation } from "../../app/api/salesManagersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import SalesManagerForm from "../../components/SalesManagerForm"

const NewSalesManager = () => {
  const [addNewSalesManager, { isLoading, isSuccess, isError, error }] =
    useAddNewSalesManagerMutation()

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    if (isSuccess) {
      setName("")
      setPhone("")
      setEmail("")
      navigate("/dash/salesManagers")
    }
  }, [isSuccess, navigate])

  const onSaveSalesManagerClicked = async () => {
    await addNewSalesManager({ name, phone, email })
  }

  const canSave = email && name && phone && !isLoading

  const content = (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Create New Sales Manager</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveSalesManagerClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
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
export default NewSalesManager
