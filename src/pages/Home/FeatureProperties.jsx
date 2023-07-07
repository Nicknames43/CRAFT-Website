import React, { useEffect, useState, useRef, useCallback } from "react"
import keswickLogo from "/images/keswick-marketplace-logo.svg"
import tempLogo from "/images/temp-img.svg"
import arrow from "/images/next slide arrow.svg"
import "../../assets/featureProperties.scss"

function FeatureProperty({ item }) {
  return (
    <div className="carousel-item">
      <img src={item.icon} alt={item.title} className="carousel-item__img" />
      <div className="carousel-item__text">
        <p className="carousel-item__description">{item.description}</p>
        <br />
        <p className="carousel-item__info-link">
          For more information, please visit:{" "}
          <a href={`https://www.${item.infoLink}`}>{item.infoLink}</a>
        </p>
      </div>
    </div>
  )
}

function FeatureProperties() {
  const innerRef = useRef(null)
  const timerRef = useRef(null)
  const [currIndex, setCurrIndex] = useState(1)
  const [translateX, setTranslateX] = useState(0)
  const [autoPlay, setAutoPlay] = useState(true)
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

  const goToNextSlide = useCallback(() => {
    innerRef.current.style.transitionDuration = slideSpeed
    if (currIndex >= items.length) {
      setTranslateX(100 * (items.length + 1))
      setCurrIndex(1)
    } else {
      setTranslateX(100 * (currIndex + 1))
      setCurrIndex(currIndex + 1)
    }
  }, [currIndex, items])

  const goToPrevSlide = () => {
    innerRef.current.style.transitionDuration = slideSpeed
    if (currIndex <= 1) {
      setTranslateX(0)
      setCurrIndex(items.length)
    } else {
      setTranslateX(100 * (currIndex - 1))
      setCurrIndex(currIndex - 1)
    }
  }

  const goToSlide = (newIndex) => {
    innerRef.current.style.transitionDuration = slideSpeed
    setCurrIndex(newIndex)
    setTranslateX(100 * newIndex)
  }

  useEffect(() => {
    const transitionEnd = () => {
      if (currIndex <= 1) {
        innerRef.current.style.transitionDuration = "0ms"
        setTranslateX(100 * currIndex)
      }

      if (currIndex >= items.length) {
        innerRef.current.style.transitionDuration = "0ms"
        setTranslateX(100 * items.length)
      }
    }

    document.addEventListener("transitionend", transitionEnd)

    return () => {
      document.removeEventListener("transitionend", transitionEnd)
    }
  }, [currIndex, items])

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(() => {
      goToNextSlide()
    }, 5000)
    if (!autoPlay) {
      clearTimeout(timerRef.current)
    }

    return () => clearTimeout(timerRef.current)
  }, [goToNextSlide])

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
          <div
            xmlns="http://www.w3.org/1999/xhtml"
            className="feature-properties__carousel carousel"
            onMouseEnter={() => {
              setAutoPlay(false)
            }}
            onMouseLeave={() => {
              setAutoPlay(true)
            }}
          >
            <div
              className="carousel__inner"
              ref={innerRef}
              style={{ transform: `translate(-${translateX}%)` }}
            >
              <FeatureProperty key="fp0" item={items[items.length - 1]} />
              {items.map((item) => {
                return <FeatureProperty key={item.id} item={item} />
              })}
              <FeatureProperty key={`fp${items.length + 1}`} item={items[0]} />
            </div>
            <div className="carousel__buttons">
              <button onClick={goToPrevSlide} className="carousel__left">
                <img src={arrow} alt="Prev" className="carousel__left-arrow" />
              </button>
              <div className="carousel__indicators">
                {items.map((item, index) => {
                  return (
                    <button
                      key={`${item.title} button`}
                      className="carousel__indicator"
                      onClick={() => {
                        goToSlide(index + 1)
                      }}
                    >
                      <svg viewBox="0 0 90.792 24.827">
                        <g transform="translate(-798.035 -3283.99)">
                          <path
                            d="M403.934-174.07l-24.574,14.827h30.287l24.574-14.827Z"
                            transform="translate(436.639 3463.06)"
                            fill="#fff"
                            style={{
                              transform: `opacity ${slideSpeed}`,
                              opacity: `${index + 1 === currIndex ? 0.399 : 1}`,
                            }}
                          />
                          <path
                            d="M403.934-174.07l-24.574,14.827h30.287l24.574-14.827H403.934m-1.392-5h49.644L411.04-154.243H361.4Z"
                            transform="translate(436.639 3463.06)"
                            fill="#fff"
                            style={{
                              transform: `opacity ${slideSpeed}`,
                              opacity: `${index + 1 === currIndex ? 1 : 0}`,
                            }}
                          />
                        </g>
                      </svg>
                    </button>
                  )
                })}
              </div>
              <button onClick={goToNextSlide} className="carousel__right">
                <img src={arrow} alt="Next" className="carousel__right-arrow" />
              </button>
            </div>
          </div>
        </foreignObject>
      </svg>
    </div>
  )
}

export default FeatureProperties
