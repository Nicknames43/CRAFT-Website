import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import useAuth from "../hooks/useAuth"

const UserForm = ({
  isError,
  error,
  username,
  setUsername,
  password,
  setPassword,
  admin,
  setAdmin,
}) => {
  const { admin: authAdmin } = useAuth()
  const [usernameErr, setUsernameErr] = useState(isError)
  const [passwordErr, setPasswordErr] = useState(isError)
  const [adminErr, setAdminErr] = useState(isError)

  const onUsernameChanged = (e) => setUsername(e.target.value)
  const onPasswordChanged = (e) => setPassword(e.target.value)
  const onAdminChanged = () => setAdmin(!admin)

  useEffect(() => {
    setUsernameErr(isError)
    setPasswordErr(isError)
    setAdminErr(isError)
  }, [isError])

  useEffect(() => {
    setUsernameErr(false)
  }, [username])

  useEffect(() => {
    setPasswordErr(false)
  }, [password])

  useEffect(() => {
    setAdminErr(false)
  }, [admin])

  const content = (
    <>
      <label className="form__label" htmlFor="username">
        Username:
        <span className={`nowrap ${usernameErr ? "errmsg" : "noerrmsg"}`}>
          {error?.username ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="username"
        name="username"
        type="text"
        autoComplete="off"
        value={username}
        onChange={onUsernameChanged}
      />

      <label className="form__label" htmlFor="password">
        Password: <span className="nowrap">[empty = no change]</span>{" "}
        <span className={`nowrap ${passwordErr ? "errmsg" : "noerrmsg"}`}>
          {error?.password ?? "" ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="password"
        name="password"
        type="password"
        value={password}
        onChange={onPasswordChanged}
      />
      {authAdmin ? (
        <label className="form__label" htmlFor="admin">
          Admin user:{" "}
          <input
            type="checkbox"
            id="admin"
            name="admin"
            className={`form__select`}
            checked={admin}
            onChange={onAdminChanged}
          />
          <span className={`nowrap ${adminErr ? "errmsg" : "noerrmsg"}`}>
            {error?.admin ?? "" ?? ""}
          </span>
        </label>
      ) : (
        <></>
      )}
    </>
  )

  return content
}
export default UserForm

UserForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  admin: PropTypes.bool.isRequired,
  setAdmin: PropTypes.func.isRequired,
}
