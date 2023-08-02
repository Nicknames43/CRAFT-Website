import Carousel from "../../components/Carousel"
import PropTypes from "prop-types"

function PropertyPhoto({ photo, title, description }) {
  return (
    <div className="property-photo">
      <img
        src={`/images/${photo}`}
        alt={title}
        className="property-photo__img"
      />
      <div className="property-photo__text">
        <p className="property-photo__description">{description}</p>
      </div>
    </div>
  )
}

PropertyPhoto.propTypes = {
  photo: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

function PropertyPhotos({ property, photos }) {
  const slideSpeed = "0.5s"
  const autoPlaySpeed = 5
  const slides = []

  for (let i = 0; i < photos.length; i++) {
    slides[i] = (
      <PropertyPhoto photo={photos[i]} title="temp" description="temp" />
    )
  }

  return (
    <div className="property-photos">
      <svg className="property-photos__bg" viewBox="0 0 1920 609.04">
        <g
          id="feature_background"
          data-name="feature background"
          transform="translate(0 -2415.543)"
        >
          <rect
            id="Rectangle_193"
            data-name="Rectangle 193"
            width="1920"
            height="453.156"
            transform="translate(0 2571.427)"
            fill="#233682"
          />
          <path
            id="Path_418"
            data-name="Path 418"
            d="M5102.126,760.562,4137.213,1369.6h964.914Z"
            transform="translate(-3182.127 1654.98)"
            fill="#2869a8"
          />
        </g>
        <foreignObject x="230" y="0" width="1445" height="156">
          <div
            className="property-photos__title-container"
            xmlns="http://www.w3.org/1999/xhtml"
          >
            <p className="property-photos__title">Photos</p>
          </div>
        </foreignObject>
        <foreignObject x="100" y="157" width="1702" height="450">
          <Carousel
            itemPrefix={`${property}_img`}
            autoPlaySpeed={autoPlaySpeed * 1000}
            slideSpeed={slideSpeed}
            items={slides}
          />
        </foreignObject>
      </svg>
    </div>
  )
}

PropertyPhotos.propTypes = {
  property: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default PropertyPhotos
