import { useState, useEffect } from "react"
import PropTypes from "prop-types"

const ResidentialForm = ({
  isError,
  error,
  numSingle,
  setNumSingle,
  numSemi,
  setNumSemi,
  numTownHome,
  setNumTownHome,
  numStacked,
  setNumStacked,
  numCondo,
  setNumCondo,
}) => {
  const [numSingleErr, setNumSingleErr] = useState(isError)
  const [numSemiErr, setNumSemiErr] = useState(isError)
  const [numTownHomeErr, setNumTownHomeErr] = useState(isError)
  const [numStackedErr, setNumStackedErr] = useState(isError)
  const [numCondoErr, setNumCondoErr] = useState(isError)

  const onNumSingleChanged = (event) => setNumSingle(event.target.value)
  const onNumSemiChanged = (event) => setNumSemi(event.target.value)
  const onNumTownHomeChanged = (event) => setNumTownHome(event.target.value)
  const onNumStackedChanged = (event) => setNumStacked(event.target.value)
  const onNumCondoChanged = (event) => setNumCondo(event.target.value)

  useEffect(() => {
    setNumSingleErr(isError)
    setNumSemiErr(isError)
    setNumTownHomeErr(isError)
    setNumStackedErr(isError)
    setNumCondoErr(isError)
  }, [isError])

  useEffect(() => {
    setNumSingleErr(false)
  }, [numSingle])

  useEffect(() => {
    setNumSemiErr(false)
  }, [numSemi])

  useEffect(() => {
    setNumTownHomeErr(false)
  }, [numTownHome])

  useEffect(() => {
    setNumStackedErr(false)
  }, [numStacked])

  useEffect(() => {
    setNumCondoErr(false)
  }, [numCondo])

  return (
    <>
      <label className="form__label" htmlFor="numSingle">
        NumSingle:{" "}
        <span className={`nowrap ${numSingleErr ? "errmsg" : "noerrmsg"}`}>
          {error?.numSingle ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="numSingle"
        name="numSingle"
        type="number"
        autoComplete="off"
        value={numSingle}
        onChange={onNumSingleChanged}
      />
      <label className="form__label" htmlFor="numSemi">
        NumSemi:{" "}
        <span className={`nowrap ${numSemiErr ? "errmsg" : "noerrmsg"}`}>
          {error?.numSemi ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="numSemi"
        name="numSemi"
        type="number"
        autoComplete="off"
        value={numSemi}
        onChange={onNumSemiChanged}
      />
      <label className="form__label" htmlFor="numTownHome">
        NumTownHome:{" "}
        <span className={`nowrap ${numTownHomeErr ? "errmsg" : "noerrmsg"}`}>
          {error?.numTownHome ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="numTownHome"
        name="numTownHome"
        type="number"
        autoComplete="off"
        value={numTownHome}
        onChange={onNumTownHomeChanged}
      />
      <label className="form__label" htmlFor="numStacked">
        NumStacked:{" "}
        <span className={`nowrap ${numStackedErr ? "errmsg" : "noerrmsg"}`}>
          {error?.numStacked ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="numStacked"
        name="numStacked"
        type="number"
        autoComplete="off"
        value={numStacked}
        onChange={onNumStackedChanged}
      />
      <label className="form__label" htmlFor="numCondo">
        NumCondo:{" "}
        <span className={`nowrap ${numCondoErr ? "errmsg" : "noerrmsg"}`}>
          {error?.numCondo ?? ""}
        </span>
      </label>
      <input
        className={`form__input`}
        id="numCondo"
        name="numCondo"
        type="number"
        autoComplete="off"
        value={numCondo}
        onChange={onNumCondoChanged}
      />
    </>
  )
}

export default ResidentialForm

ResidentialForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  error: PropTypes.object.isRequired,
  numSingle: PropTypes.number.isRequired,
  setNumSingle: PropTypes.func.isRequired,
  numSemi: PropTypes.number.isRequired,
  setNumSemi: PropTypes.func.isRequired,
  numTownHome: PropTypes.number.isRequired,
  setNumTownHome: PropTypes.func.isRequired,
  numStacked: PropTypes.number.isRequired,
  setNumStacked: PropTypes.func.isRequired,
  numCondo: PropTypes.number.isRequired,
  setNumCondo: PropTypes.func.isRequired,
}
