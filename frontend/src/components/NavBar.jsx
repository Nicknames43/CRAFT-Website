import { Link } from "react-router-dom"
import logo from "/images/craft logo.svg"

function NavBar() {
  return (
    <nav className="nav-bar">
      <Link className="nav-bar__img-link" to="/">
        <img src={logo} alt="Home" />
      </Link>
      <ul>
        <li>
          <Link className="nav-bar__txt-link" to="/About">
            About
          </Link>
        </li>
        <li>
          <Link className="nav-bar__txt-link" to="/Services">
            Services
          </Link>
        </li>
        <li>
          <Link className="nav-bar__txt-link" to="/Properties">
            Properties
          </Link>
        </li>
        <li>
          <Link className="nav-bar__txt-link" to="/Contact">
            Contact
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
