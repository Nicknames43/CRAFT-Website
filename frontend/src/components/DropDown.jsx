import { useState } from "react"
import dropDownArrow from "/images/drop down arrow.svg"
import PropTypes from "prop-types"

function DropDown({ heading, content }) {
  const [opened, setOpened] = useState(false)

  const dropDownOpenClose = () => {
    setOpened(!opened)
  }

  return (
    <div className="drop-down">
      <div className="drop-down__top">
        <h1 className="drop-down__heading">{heading}</h1>
        <div className="drop-down__button-container">
          <button className="drop-down__button" onClick={dropDownOpenClose}>
            <img
              src={dropDownArrow}
              alt="Drop Down"
              className="drop-down__button-img"
              style={{ transform: `rotate(${opened ? "0deg" : "90deg"})` }}
            />
          </button>
        </div>
      </div>
      <div
        className="drop-down__content-container"
        style={{ gridTemplateRows: opened ? "1fr" : "0fr" }}
      >
        <div className="drop-down__content">{content}</div>
      </div>
    </div>
  )
}

DropDown.propTypes = {
  heading: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]).isRequired,
}

export default DropDown
