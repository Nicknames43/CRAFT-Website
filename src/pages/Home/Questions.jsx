import "../../assets/questions.scss";
import { Link } from "react-router-dom";

function Questions() {
  return (
    <div className="questions">
      <div className="questions__bg">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2524.135 269.04">
          <g id="rectangles" transform="translate(350.771 -5371.768)">
            <path
              id="search_section"
              data-name="search section"
              d="M-27.847,7986.658H1841.118l-160.449,100H-188.3Z"
              transform="translate(1950.118 13469.98) rotate(180)"
              fill="#233682"
            />
            <path
              id="search_section_-_Outline"
              data-name="search section - Outline"
              d="M-27.847,7986.658l-160.448,100H1680.67l160.448-100H-27.847m-2.861-10H1876.069l-192.538,120H-223.246Z"
              transform="translate(1950.118 13469.98) rotate(180)"
              fill="#233682"
            />
            <path
              id="search_section-2"
              data-name="search section"
              d="M-27.847,7986.658H1841.118l-160.449,100H-188.3Z"
              transform="translate(1525.298 13614.82) rotate(180)"
              fill="#233682"
            />
            <path
              id="search_section_-_Outline-2"
              data-name="search section - Outline"
              d="M-27.847,7986.658l-160.448,100H1680.67l160.448-100H-27.847m-2.861-10H1876.069l-192.538,120H-223.246Z"
              transform="translate(1525.298 13614.82) rotate(180)"
              fill="#233682"
            />
            <path
              id="Path_244"
              data-name="Path 244"
              d="M77.8,152.823H393.467L594.739,30.358H279.077"
              transform="translate(1519.081 5487.984)"
              fill="#2869a8"
            />
            <path
              id="Path_247"
              data-name="Path 247"
              d="M77.8,152.823H393.467L594.739,30.358H279.077"
              transform="translate(-369.739 5341.41)"
              fill="#2869a8"
            />
          </g>
          <foreignObject x="0" y="12" width="2524" height="99">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="questions__container"
            >
              <p className="questions__text">CONTACT US AT 1-866-979-9996</p>
            </div>
          </foreignObject>
          <foreignObject x="0" y="157" width="2524" height="99">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              className="questions__container"
            >
              <p className="questions__text">
                VISIT OUR <Link to="/Contact"> CONTACT</Link> PAGE
              </p>
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  );
}

export default Questions;