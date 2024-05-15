import ButtonLink from "../../components/ButtonLink"

function Welcome() {
  return (
    <div className="home-welcome">
      <svg className="home-welcome__bg" viewBox="0 0 2384.399 313">
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
        <g id="arrows" transform="translate(252.997 -345)">
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
            transform="translate(2131.402 636.167) rotate(180)"
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
            transform="translate(178 636.167) rotate(180)"
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
          <g id="gradient" transform="translate(1366 362.564)">
            <rect
              id="Rectangle_199"
              data-name="Rectangle 199"
              width="291"
              height="580"
              transform="translate(580 0.436) rotate(90)"
              fill="url(#linear-gradient)"
            />
            <rect
              id="Rectangle_200"
              data-name="Rectangle 200"
              width="291"
              height="580"
              transform="translate(580 0.436) rotate(90)"
              fill="url(#linear-gradient)"
            />
          </g>
          <g
            id="gradient-2"
            data-name="gradient"
            transform="translate(253 870) rotate(180)"
          >
            <rect
              id="Rectangle_199-2"
              data-name="Rectangle 199"
              width="313"
              height="440"
              transform="translate(440 212) rotate(90)"
              fill="url(#linear-gradient)"
            />
            <rect
              id="Rectangle_200-2"
              data-name="Rectangle 200"
              width="313"
              height="440"
              transform="translate(440 212) rotate(90)"
              fill="url(#linear-gradient)"
            />
          </g>
        </g>
        <foreignObject x="475" y="0" width="1300" height="292">
          <div
            className="home-welcome__statement-container"
            xmlns="http://www.w3.org/1999/xhtml"
          >
            <p className="home-welcome__statement">WELCOME TO THE</p>
            <p className="home-welcome__statement">CRAFT DEVELOPMENT</p>
            <p className="home-welcome__statement">CORPORATION</p>
          </div>
        </foreignObject>
      </svg>
      <div className="home-welcome__summary">
        <p className="home-welcome__summary-text">
          A leading retail space development and management organization serving
          many areas of the real estate industry. CRAFT development corporation
          has the resources, experience, and expertise to bring retail, mixed
          uses, office, and residential projects to completion.
        </p>
      </div>
      <ButtonLink text="LEARN MORE" page="About" w="27vw" h="5vw" />
    </div>
  )
}

export default Welcome
