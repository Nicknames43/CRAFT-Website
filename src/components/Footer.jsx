import { Link } from "react-router-dom"
import "../assets/footer.scss"
import logoWhite from "/images/craft logo white.svg"

function Footer() {
  const year = new Date().getFullYear()
  return (
    <div className="footer">
      <nav className="footer__nav">
        <ul>
          <li>
            <Link to="/About">About</Link>
          </li>
          <li>
            <Link to="/Services">Services</Link>
          </li>
          <li>
            <Link to="/Properties">Properties</Link>
          </li>
          <li>
            <Link to="/Contact">Contact</Link>
          </li>
        </ul>
      </nav>
      <div className="footer__address">
        <h1>CRAFT DEVELOPMENT CORPORATION</h1>
        <p>10 Queen Elizabeth Boulevard, Unit 2</p>
        <p>Toronto, Ontario</p>
        <p>M8Z 1L8 Canada</p>
      </div>
      <div className="footer__phone">
        <h1>PHONE</h1>
        <p>(416)-979-9996</p>
      </div>
      <div className="footer__fax">
        <h1>FAX</h1>
        <p>(416)-979-0593</p>
      </div>
      <div className="footer__tollFree">
        <h1>TOLL-FREE</h1>
        <p>1-866-979-9996</p>
      </div>
      <div className="footer__email">
        <h1>EMAIL</h1>
        <p>INFO@CRAFTDEVELOPMENT.CA</p>
      </div>
      <img src={logoWhite} alt="CRAFT Logo" />
      <div className="footer__credit">
        <p>
          Copyright &copy; {year} CRAFT DEVELOPMENT CORPORATION. ALL RIGHTS
          RESERVED.{" "}
          <Link className="footer__priv-pol" to="/Privacy_Policy">
            PRIVACY POLICY.
          </Link>
        </p>
        <p>
          WEBSITE DESIGN BY PXPPYHILL ART & DESIGN. DEVELOPMENT BY NICHOLAS
          PEDRO.
        </p>
      </div>
    </div>
  )
}

export default Footer
