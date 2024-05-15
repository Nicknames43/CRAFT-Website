import PropTypes from "prop-types"

function InquiriesContent({ salesManager = null }) {
  if (salesManager === null) {
    return (
      <div className="inquiries">
        <p className="inquiries__title">SALES MANAGER</p>
        <p className="inquiries__text">Larry Regan</p>
        <p className="inquiries__text">(416) 204-0730</p>
        <p className="inquiries__text">lregan@craftgrp.com</p>
      </div>
    )
  } else if (typeof salesManager === "string") {
    return (
      <div className="inquiries">
        <p className="inquiries__title">SALES MANAGER</p>
        <a className="inquiries__text" href={salesManager}>
          salesManager
        </a>
      </div>
    )
  }
  return (
    <div className="inquiries">
      <p className="inquiries__title">SALES MANAGER</p>
      <p className="inquiries__text">{salesManager.name}</p>
      <p className="inquiries__text">{salesManager.number}</p>
      <p className="inquiries__text">{salesManager.email}</p>
    </div>
  )
}

InquiriesContent.propTypes = {
  salesManager: PropTypes.oneOf([
    PropTypes.string.isRequired,
    PropTypes.exact({
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ]),
}

export default InquiriesContent
