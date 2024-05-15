import PropTypes from "prop-types"

function PropertyTitle({ name, type, address }) {
  return (
    <div className="property-title">
      <svg className="property-title__bg" viewBox="0 0 2384.399 310">
        <defs>
          <linearGradient
            id="linear-gradient"
            x1="0.5"
            x2="0.5"
            y2="1"
            gradientUnits="objectBoundingBox"
          >
            <stop offset="0" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#fff" />
          </linearGradient>
        </defs>
        <g id="arrows" transform="translate(252.997 -350)">
          <g id="arrow" transform="translate(1871.997 636.167) rotate(180)">
            <path
              id="top"
              d="M208.1,130.972h7.638L430.994,0H215.255L0,130.972Z"
              fill="#233682"
            />
            <path
              id="bottom"
              d="M222.893,130.972h-7.638L0,0H215.739L430.994,130.972Z"
              transform="translate(0.003 130.972)"
              fill="#2869a8"
            />
          </g>
          <g
            id="arrow-2"
            data-name="arrow"
            transform="translate(1577.997 636.167) rotate(180)"
          >
            <path
              id="top-2"
              data-name="top"
              d="M208.1,130.972h7.638L430.994,0H215.255L0,130.972Z"
              fill="#233682"
            />
            <path
              id="bottom-2"
              data-name="bottom"
              d="M222.893,130.972h-7.638L0,0H215.739L430.994,130.972Z"
              transform="translate(0.003 130.972)"
              fill="#2869a8"
            />
          </g>
          <g
            id="arrow-3"
            data-name="arrow"
            transform="translate(2131.402 636.167) rotate(180)"
          >
            <path
              id="top-3"
              data-name="top"
              d="M208.1,130.972h7.638L430.994,0H215.255L0,130.972Z"
              fill="#233682"
            />
            <path
              id="bottom-3"
              data-name="bottom"
              d="M222.893,130.972h-7.638L0,0H215.739L430.994,130.972Z"
              transform="translate(0.003 130.972)"
              fill="#2869a8"
            />
          </g>
          <g
            id="arrow-4"
            data-name="arrow"
            transform="translate(178 636.167) rotate(180)"
          >
            <path
              id="top-4"
              data-name="top"
              d="M208.1,130.972h7.638L430.994,0H215.255L0,130.972Z"
              fill="#233682"
            />
            <path
              id="bottom-4"
              data-name="bottom"
              d="M222.893,130.972h-7.638L0,0H215.739L430.994,130.972Z"
              transform="translate(0.003 130.972)"
              fill="#2869a8"
            />
          </g>
          <g id="gradient" transform="translate(279 99)">
            <rect
              id="Rectangle_199"
              data-name="Rectangle 199"
              width="310"
              height="580"
              transform="translate(1388 251) rotate(90)"
              fill="url(#linear-gradient)"
            />
            <rect
              id="Rectangle_200"
              data-name="Rectangle 200"
              width="310"
              height="580"
              transform="translate(1388 251) rotate(90)"
              fill="url(#linear-gradient)"
            />
          </g>
          <g
            id="gradient-2"
            data-name="gradient"
            transform="translate(1061 911.3) rotate(180)"
          >
            <rect
              id="Rectangle_199-2"
              data-name="Rectangle 199"
              width="310"
              height="440"
              transform="translate(1248 251.3) rotate(90)"
              fill="url(#linear-gradient)"
            />
            <rect
              id="Rectangle_200-2"
              data-name="Rectangle 200"
              width="310"
              height="440"
              transform="translate(1248 251.3) rotate(90)"
              fill="url(#linear-gradient)"
            />
          </g>
        </g>
        <foreignObject x="450" y="25" width="1200" height="260">
          <div
            className="property-title__name-container"
            xmlns="http://www.w3.org/1999/xhtml"
          >
            <h1 className="property-title__name">{name}</h1>
          </div>
        </foreignObject>
      </svg>
      <p className="property-title__type-address">{type}</p>
      <p className="property-title__type-address">{`${address.streetNum} ${address.streetName}`}</p>
      <p className="property-title__type-address">{`${address.city}, ${address.province}`}</p>
      <p className="property-title__type-address">{`${address.country}, ${address.postalCode}`}</p>
    </div>
  )
}

PropertyTitle.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  address: PropTypes.exact({
    country: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    streetName: PropTypes.string.isRequired,
    streetNum: PropTypes.string.isRequired,
    postalCode: PropTypes.string.isRequired,
  }).isRequired,
}

export default PropertyTitle
