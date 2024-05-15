import { Link } from "react-router-dom"
import ButtonLink from "../../components/ButtonLink"

function TrustInterested() {
  return (
    <div className="trust-interested">
      <div className="trust">
        <h1>COMPANIES WHO TRUST CRAFT</h1>
        <ul className="trust__companies">
          <li className="trust__item">
            <p className="trust__company">Bank of Montreal</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Chapters</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Dollarama</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">East Side Mario&apos;s</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Marks</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Mr.Sub</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Petro Canada</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Pizza Pizza</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">RBC</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Rexall</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Shoppers Drug Mart</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Staples</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">St. Louis Bar & Grill</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Subway</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">TD Canada Trust</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Tim Horton&apos;s</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Value Village</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Walmart</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">Zehr&apos;s</p>
          </li>
          <li className="trust__item">
            <p className="trust__company">And More!</p>
          </li>
        </ul>
      </div>
      <div className="interested">
        <h1>INTERESTED IN OUR DEVELOPMENTS?</h1>
        <svg className="interested__arrow" viewBox="0 0 710 336.408">
          <g
            id="Group_19"
            data-name="Group 19"
            transform="translate(-73 -4348.784)"
          >
            <path
              id="Path_235"
              data-name="Path 235"
              d="M77.8,198.561H511.361L787.8,30.358H354.248"
              transform="translate(-4.805 4318.427)"
              fill="#233682"
            />
            <path
              id="Path_237"
              data-name="Path 237"
              d="M492.536,95.486l276.444,168.2H335.423L58.979,95.486Z"
              transform="translate(14.021 4421.503)"
              fill="#2869a8"
            />
          </g>
          <foreignObject x="125" y="-1" width="300" height="336.408">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="interested__text-container"
            >
              <p className="interested__text">CRAFT&apos;S PROPERTIES</p>
            </div>
          </foreignObject>
          <foreignObject x="330" y="240" width="418" height="95">
            <ButtonLink
              text="LEARN MORE"
              page="Properties"
              inverted={true}
              w="100%"
              h="100%"
            />
          </foreignObject>
        </svg>
        <svg className="interested__arrow" viewBox="0 0 710 336.408">
          <g
            id="Group_19"
            data-name="Group 19"
            transform="translate(-73 -4348.784)"
          >
            <path
              id="Path_235"
              data-name="Path 235"
              d="M77.8,198.561H511.361L787.8,30.358H354.248"
              transform="translate(-4.805 4318.427)"
              fill="#233682"
            />
            <path
              id="Path_237"
              data-name="Path 237"
              d="M492.536,95.486l276.444,168.2H335.423L58.979,95.486Z"
              transform="translate(14.021 4421.503)"
              fill="#2869a8"
            />
          </g>
          <foreignObject x="125" y="-1" width="300" height="336.408">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="interested__text-container"
            >
              <p className="interested__text">CURRENT LEASING OPPORTUNITIES</p>
            </div>
          </foreignObject>
          <foreignObject x="330" y="240" width="418" height="95">
            <ButtonLink
              text="LEARN MORE"
              page="Properties"
              inverted={true}
              w="100%"
              h="100%"
            />
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}

export default TrustInterested
