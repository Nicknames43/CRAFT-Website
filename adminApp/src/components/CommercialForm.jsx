import { Fragment } from "react"
import PropTypes from "prop-types"
import { useState, useEffect } from "react"

const CommercialForm = ({
  isError,
  error,
  size,
  setSize,
  featuredTenants,
  setFeaturedTenants,
  leaseSize,
  setLeaseSize,
  type,
  setType,
}) => {
  const [sizeErr, setSizeErr] = useState(isError)
  const [featuredTenantsErr, setFeaturedTenantsErr] = useState(isError)
  const [leaseSizeErr, setLeaseSizeErr] = useState(isError)
  const [typeErr, setTypeErr] = useState(isError)

  const onSizeChanged = (event) => {
    const num = Number(event.target.value).valueOf()
    if (isNaN(num) || num < 0) {
      setSize(0)
    } else {
      setSize(num)
    }
  }
  const onFeaturedTenantsChanged = (event, index) => {
    let data = [...featuredTenants]
    data[index] = event.target.value
    setFeaturedTenants(data)
  }
  const onLeaseSizeChanged = (event) => {
    const num = Number(event.target.value).valueOf()
    if (isNaN(num) || num < 0) {
      setLeaseSize(0)
    } else {
      setLeaseSize(num)
    }
  }
  const onTypeChanged = (event) => setType(event.target.value)
  const addFeaturedTenants = () => setFeaturedTenants([...featuredTenants, ""])
  const removeFeaturedTenants = (index) => {
    let data = [...featuredTenants]
    data.splice(index, 1)
    setFeaturedTenants(data)
  }

  useEffect(() => {
    setSizeErr(isError)
    setFeaturedTenantsErr(isError)
    setLeaseSizeErr(isError)
    setTypeErr(isError)
  }, [isError])

  useEffect(() => {
    setSizeErr(false)
  }, [size])

  useEffect(() => {
    setFeaturedTenantsErr(false)
  }, [featuredTenants])

  useEffect(() => {
    setLeaseSizeErr(false)
  }, [leaseSize])

  useEffect(() => {
    setTypeErr(false)
  }, [type])

  return (
    <>
      <label className="form__label" htmlFor="size">
        Size:{" "}
        <span className={`nowrap ${sizeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.size ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="size"
        name="size"
        type="number"
        autoComplete="off"
        value={size}
        onChange={onSizeChanged}
      />
      <label className="form__label">
        Featured Tenants:{" "}
        <span
          className={`nowrap ${featuredTenantsErr ? "errmsg" : "noerrmsg"}`}
        >
          {error?.featuredTenants ?? ""}
        </span>
      </label>
      {featuredTenants.map((value, index) => {
        return (
          <Fragment key={`featuredTenants${index}`}>
            <label className="form__label" htmlFor={`featuredTenants${index}`}>
              Featured Tenant #{index + 1}:
            </label>
            <input
              className={`form__input`}
              id={`featuredTenants${index}`}
              name={`featuredTenants${index}`}
              type="text"
              autoComplete="off"
              value={value}
              onChange={(event) => onFeaturedTenantsChanged(event, index)}
            />
            <button
              className={`form__input`}
              onClick={() => removeFeaturedTenants(index)}
            >
              Remove
            </button>
          </Fragment>
        )
      })}
      <button onClick={addFeaturedTenants}>Add More Featured Tenants</button>
      <label className="form__label" htmlFor="leaseSize">
        Lease Size:{" "}
        <span className={`nowrap ${leaseSizeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.leaseSize ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="leaseSize"
        name="leaseSize"
        type="number"
        autoComplete="off"
        value={leaseSize}
        onChange={onLeaseSizeChanged}
      />
      <label className="form__label" htmlFor="type">
        Type:{" "}
        <span className={`nowrap ${typeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.type ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="type"
        name="type"
        type="text"
        autoComplete="off"
        value={type}
        onChange={onTypeChanged}
      />
    </>
  )
}

export default CommercialForm

CommercialForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  setSize: PropTypes.func.isRequired,
  featuredTenants: PropTypes.arrayOf(PropTypes.string).isRequired,
  setFeaturedTenants: PropTypes.func.isRequired,
  leaseSize: PropTypes.number.isRequired,
  setLeaseSize: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  setType: PropTypes.func.isRequired,
}
