import { useEffect, useState, useRef, useCallback } from "react"
import PropTypes from "prop-types"
import arrow from "/images/next slide arrow.svg"

function Carousel({
  items,
  itemPrefix,
  slideSpeed = "0.5s",
  autoPlaySpeed = 0,
}) {
  const innerRef = useRef(null)
  const timerRef = useRef(null)
  const [currIndex, setCurrIndex] = useState(1)
  const [translateX, setTranslateX] = useState(100)
  const [autoPlay, setAutoPlay] = useState(true)

  const goToNextSlide = useCallback(() => {
    innerRef.current.style.transitionDuration = slideSpeed
    if (currIndex >= items.length) {
      setTranslateX(100 * (items.length + 1))
      setCurrIndex(1)
    } else {
      setTranslateX(100 * (currIndex + 1))
      setCurrIndex(currIndex + 1)
    }
  }, [currIndex, items, slideSpeed])

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
    }, autoPlaySpeed)
    if (!autoPlay) {
      clearTimeout(timerRef.current)
    }

    return () => clearTimeout(timerRef.current)
  }, [goToNextSlide, autoPlay, autoPlaySpeed])

  return (
    <div
      className="carousel"
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
        <div className="carousel__item" key={`${itemPrefix}0`}>
          {items[items.length - 1]}
        </div>
        {items.map((item, index) => {
          return (
            <div className="carousel__item" key={`${itemPrefix}${index + 1}`}>
              {item}
            </div>
          )
        })}
        <div
          className="carousel__item"
          key={`${itemPrefix}${items.length + 1}`}
        >
          {items[0]}
        </div>
      </div>
      <div className="carousel__buttons">
        <button onClick={goToPrevSlide} className="carousel__left">
          <img src={arrow} alt="Prev" className="carousel__left-arrow" />
        </button>
        <div className="carousel__indicators">
          {items.map((_item, index) => {
            return (
              <button
                key={`${itemPrefix}Button${index}`}
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
  )
}

Carousel.propTypes = {
  items: PropTypes.array.isRequired,
  itemPrefix: PropTypes.string.isRequired,
  slideSpeed: PropTypes.string.isRequired,
  autoPlaySpeed: PropTypes.number,
}

export default Carousel
