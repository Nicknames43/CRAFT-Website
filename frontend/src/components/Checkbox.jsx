import PropTypes from "prop-types"

function Checkbox({ value, position, allChecked, setAllChecked }) {
  const handleOnChange = (pos) => {
    const updatedAllChecked = allChecked.map((item, index) =>
      index === pos ? !item : item
    )

    setAllChecked(updatedAllChecked)
  }

  return (
    <label className="checkbox">
      <input
        className="checkbox__btn"
        type="checkbox"
        onChange={() => {
          handleOnChange(position)
        }}
      />
      <svg className="checkbox__img" viewBox="0 0 63.932 22.827">
        <g id="bullet" transform="translate(-955.635 -2524)">
          <path
            id="Path_344"
            data-name="Path 344"
            d="M397.816-174.07l-18.455,14.827h22.746l18.455-14.827Z"
            transform="translate(587.64 2702.07)"
            fill={allChecked[position] ? "#2869a8" : "#233682"}
            opacity={allChecked[position] ? "0.75" : "1"}
          />
          <path
            id="Path_393"
            data-name="Path 393"
            d="M397.816-174.07l-18.455,14.827h22.746l18.455-14.827H397.816m-1.408-4h35.519l-28.413,22.827H368Z"
            transform="translate(587.64 2702.07)"
            fill="#233682"
            opacity={allChecked[position] ? "1" : "0"}
          />
        </g>
      </svg>
      <span className="checkbox__text">{value}</span>
    </label>
  )
}

Checkbox.propTypes = {
  value: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  allChecked: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setAllChecked: PropTypes.func.isRequired,
}

export default Checkbox
