import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"
import UserForm from "../../components/UserForm"

const NewUser = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState(false)

  useEffect(() => {
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setAdmin(false)
      navigate("/dash/users")
    }
  }, [isSuccess, navigate])

  const onSaveUserClicked = async () => {
    await addNewUser({ username, password, admin })
  }

  let canSave
  if (password) {
    canSave =
      (admin === true || admin === false) && username && password && !isLoading
  } else {
    canSave = (admin === true || admin === false) && username && !isLoading
  }

  const content = (
    <>
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Create New User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <UserForm
          isError={isError ?? false}
          error={error?.data ?? {}}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          admin={admin}
          setAdmin={setAdmin}
        />
      </form>
    </>
  )

  return content
}
export default NewUser
