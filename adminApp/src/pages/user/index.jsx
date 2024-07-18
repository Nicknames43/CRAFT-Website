import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectUserById } from "../../app/api/usersApiSlice"
import UserForm from "../../components/UserForm"
import { useState, useEffect } from "react"
import {
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave, faTrashCan } from "@fortawesome/free-solid-svg-icons"

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => selectUserById(state, id))

  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation()

  const [deleteUser, { isSuccess: isDelSuccess }] = useDeleteUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState(user.username)
  const [password, setPassword] = useState("")
  const [admin, setAdmin] = useState(user.admin)

  useEffect(() => {
    if (isSuccess || isDelSuccess) {
      setUsername("")
      setPassword("")
      setAdmin(false)
      navigate("/dash/users")
    }
  }, [isSuccess, isDelSuccess, navigate])

  const onSaveUserClicked = async () => {
    if (password) {
      await updateUser({ id: user.id, username, password, admin })
    } else {
      await updateUser({ id: user.id, username, admin })
    }
  }

  const onDeleteUserClicked = async () => {
    await deleteUser({ id: user.id })
  }

  let canSave
  if (password) {
    canSave =
      (admin === true || admin === false) && username && password && !isLoading
  } else {
    canSave = (admin === true || admin === false) && username && !isLoading
  }

  const content = !user ? (
    <p>Loading...</p>
  ) : (
    <>
      {" "}
      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Edit User</h2>
          <div className="form__action-buttons">
            <button
              className="icon-button"
              title="Save"
              onClick={onSaveUserClicked}
              disabled={!canSave}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              className="icon-button"
              title="Delete"
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
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
export default User
