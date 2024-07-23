import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const UserForm = ({
  isError,
  error,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
}) => {
  const [nameErr, setNameErr] = useState(isError)
  const [phoneErr, setPhoneErr] = useState(isError)
  const [emailErr, setEmailErr] = useState(isError)

  const onNameChanged = (e) => setName(e.target.value)
  const onPhoneChanged = (e) => setPhone(e.target.value)
  const onEmailChanged = (e) => setEmail(e.target.value)

  useEffect(() => {
    setNameErr(isError)
    setPhoneErr(isError)
    setEmailErr(isError)
  }, [isError])

  useEffect(() => {
    setNameErr(false)
  }, [name])

  useEffect(() => {
    setPhoneErr(false)
  }, [phone])

  useEffect(() => {
    setEmailErr(false)
  }, [email])

  const content = (
    <>
      <label className="form__label" htmlFor="name">
        Name:{" "}
        <span className={`nowrap ${nameErr ? "errmsg" : "noerrmsg"}`}>
          {error?.name ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="name"
        name="name"
        type="text"
        autoComplete="off"
        value={name}
        onChange={onNameChanged}
      />

      <label className="form__label" htmlFor="phone">
        Phone:{" "}
        <span className={`nowrap ${phoneErr ? "errmsg" : "noerrmsg"}`}>
          {error?.phone ?? "" ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="phone"
        name="phone"
        type="tel"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        value={phone}
        onChange={onPhoneChanged}
      />

      <label className="form__label" htmlFor="email">
        Email:{" "}
        <span className={`nowrap ${emailErr ? "errmsg" : "noerrmsg"}`}>
          {error?.email ?? "" ?? ""}
        </span>
      </label>
      <input
        type="email"
        id="email"
        name="email"
        className={`form__input`}
        value={email}
        onChange={onEmailChanged}
      />
    </>
  )

  return content
}
export default UserForm

UserForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
  phone: PropTypes.string.isRequired,
  setPhone: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
}
