import PropTypes from "prop-types"

function SearchBar({ setSearchParam }) {
  const handleChange = (event) => {
    setSearchParam(event.target.value)
  }

  return (
    <div className="search-bar">
      <h1 className="search-bar__title">SEARCH OUR PROPERTIES</h1>
      <div className="search-bar__bg">
        <svg viewBox="0 0 2464.298 122.465">
          <g id="rectangles" transform="translate(291.934 -2466.768)">
            <path
              id="search_section"
              data-name="search section"
              d="M-27.847,7986.658H1841.118l-160.449,100H-188.3Z"
              transform="translate(1949.118 10564.658) rotate(180)"
              fill="#233682"
            />
            <path
              id="search_section_-_Outline"
              data-name="search section - Outline"
              d="M-27.847,7986.658l-160.448,100H1680.67l160.448-100H-27.847m-2.861-10H1876.069l-192.538,120H-223.246Z"
              transform="translate(1949.118 10564.658) rotate(180)"
              fill="#233682"
            />
            <path
              id="Path_248"
              data-name="Path 248"
              d="M77.8,152.823H393.467L594.739,30.358H279.077"
              transform="translate(-369.739 2436.411)"
              fill="#2869a8"
            />
          </g>
          <foreignObject x="561" y="12" width="1450" height="99">
            <div
              xmlns="http://www.w3.org/1999/xhtml"
              id="property-search-input"
              className="search-bar__form"
            >
              <input
                type="text"
                placeholder="SEARCH CITY OR BUILDING"
                className="search-bar__type"
                onChange={handleChange}
              />
            </div>
          </foreignObject>
        </svg>
      </div>
    </div>
  )
}

SearchBar.propTypes = {
  setSearchParam: PropTypes.func.isRequired,
}

export default SearchBar
