import { useState, useEffect } from "react"
import { useAddNewUserMutation } from "../../app/api/usersApiSlice"
import { useNavigate } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-solid-svg-icons"

const USER_REGEX = /^[A-z]{3,20}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/

const NewUser = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation()

  const navigate = useNavigate()

  const [username, setUsername] = useState("")
  const [validUsername, setValidUsername] = useState(false)
  const [password, setPassword] = useState("")
  const [validPassword, setValidPassword] = useState(false)
  const [admin, setAdmin] = useState(false)
  const [validAdmin, setValidAdmin] = useState(false)

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username))
  }, [username])

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password))
  }, [password])

  useEffect(() => {
    setValidAdmin(admin === true || admin === false)
  }, [admin])

  useEffect(() => {
    console.log(isSuccess)
    if (isSuccess) {
      setUsername("")
      setPassword("")
      setAdmin(false)
      navigate("/dash/users")
    }
  }, [isSuccess, navigate])

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)

  const onAdminChanged = () => {
    setAdmin(!admin)
  }

  const onSaveUserClicked = async () => {
    await addNewUser({ username, password, admin })
  }

  let canSave = validAdmin && validUsername && validPassword && !isLoading

  const errClass = isError ? "errmsg" : "offscreen"
  const validUserClass = !validUsername ? "form__input--incomplete" : ""
  const validPwdClass =
    password && !validPassword ? "form__input--incomplete" : ""
  const validAdminClass = !validAdmin ? "form__input--incomplete" : ""

  const errContent = error?.data?.message ?? ""

  const content = (
    <>
      <p className={errClass}>{errContent}</p>

      <form className="form" onSubmit={(e) => e.preventDefault()}>
        <div className="form__title-row">
          <h2>Create User</h2>
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
        <label className="form__label" htmlFor="username">
          Username: <span className="nowrap">[3-20 letters]</span>
        </label>
        <input
          className={`form__input ${validUserClass}`}
          id="username"
          name="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={onUsernameChanged}
        />

        <label className="form__label" htmlFor="password">
          Password: <span className="nowrap">[empty = no change]</span>{" "}
          <span className="nowrap">[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          className={`form__input ${validPwdClass}`}
          id="password"
          name="password"
          type="password"
          value={password}
          onChange={onPasswordChanged}
        />

        <label className="form__label" htmlFor="admin">
          Admin user:
        </label>
        <input
          type="checkbox"
          id="admin"
          name="admin"
          className={`form__select ${validAdminClass}`}
          value={admin}
          onChange={onAdminChanged}
        />
      </form>
    </>
  )

  return content
}
export default NewUser
