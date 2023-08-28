import PropTypes from "prop-types"
import { Link } from "react-router-dom"

function ButtonLink({ text, page, w, h, inverted = false }) {
  const dimensions = { width: w, height: h }

  return (
    <div className="button-link" style={dimensions}>
      <svg viewBox="0 0 528.608 83.118">
        <g
          id="learn_more"
          data-name="learn more"
          transform="translate(-1226.256 -839.916)"
        >
          <path
            id="Path_306"
            data-name="Path 306"
            d="M442.029-157.718,330.788-90.6H690.665l111.241-67.118Z"
            transform="translate(924.213 1005.634)"
            fill={inverted ? "#fff" : "#233682"}
          />
          <path
            id="Path_306_-_Outline"
            data-name="Path 306 - Outline"
            d="M442.029-157.718,330.788-90.6H690.665l111.241-67.118H442.029m-2.226-8H830.651L692.891-82.6H302.043Z"
            transform="translate(924.213 1005.634)"
            fill="#2869a8"
          />
        </g>
        <foreignObject x="0" y="0" width="528" height="83">
          <div
            className="button-link__container"
            xmlns="http://www.w3.org/1999/xhtml"
          >
            <Link
              style={{ color: inverted ? "#2869a8" : "#FFF" }}
              to={`/${page}`}
            >
              {text}
            </Link>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

ButtonLink.propTypes = {
  w: PropTypes.string.isRequired,
  h: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  page: PropTypes.string.isRequired,
  inverted: PropTypes.bool,
}

export default ButtonLink
