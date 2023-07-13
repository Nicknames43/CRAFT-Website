import PropTypes from "prop-types"
import keswickLogo from "/images/keswick-marketplace-logo.svg"
import tempLogo from "/images/temp-img.svg"
import Carousel from "../../components/Carousel"
import "../../assets/featureProperties.scss"

function FeatureProperty({ icon, title, description, infoLink }) {
  return (
    <div className="carousel-item">
      <img src={icon} alt={title} className="carousel-item__img" />
      <div className="carousel-item__text">
        <p className="carousel-item__description">{description}</p>
        <br />
        <p className="carousel-item__info-link">
          For more information, please visit:{" "}
          <a href={`https://www.${infoLink}`}>{infoLink}</a>
        </p>
      </div>
    </div>
  )
}

FeatureProperty.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  infoLink: PropTypes.string.isRequired,
}

function FeatureProperties() {
  const items = [
    {
      title: "ORCA Project",
      description:
        "THE ORCA PROJECT IS A SOCIALLY CONSCIOUS, TRUE MIXED-USE DEVELOPMENT.",
      infoLink: "raildeckreset.com",
      icon: tempLogo,
      id: "fp1",
    },
    {
      title: "Keswick Marketplace",
      description: "description",
      infoLink: "keswickmarketplace.com",
      icon: keswickLogo,
      id: "fp2",
    },
    {
      title: "????LINDSEY???",
      description: "discription",
      infoLink: "google.com",
      icon: tempLogo,
      id: "fp3",
    },
  ]
  const slideSpeed = "0.5s"
  const autoPlaySpeed = 5
  const slides = []
  for (let i = 0; i < items.length; i++) {
    slides[i] = <FeatureProperty {...items[i]} />
  }

  return (
    <div className="feature-properties">
      <svg className="feature-properties__bg" viewBox="0 0 1920 609.04">
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
        <foreignObject x="150" y="0" width="1500" height="156">
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="feature-properties__title-container"
          >
            <p className="feature-properties__title">FEATURE PROPERTIES</p>
          </div>
        </foreignObject>
        <foreignObject x="100" y="157" width="1702" height="450">
          <Carousel
            className="feature-properties__carousel"
            items={slides}
            itemPrefix="fp"
            slideSpeed={slideSpeed}
            autoPlaySpeed={autoPlaySpeed * 1000}
          ></Carousel>
        </foreignObject>
      </svg>
    </div>
  )
}

export default FeatureProperties
