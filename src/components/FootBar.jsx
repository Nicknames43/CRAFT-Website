import React from "react"
import {Link} from "react-router-dom"
import "../assets/footBar.scss";
import tempURL from "/images/temp.jpg"

function FootBar(){
    return (
        <div id="foot">
            <nav id="footNav"> 
                <ul> 
                    <li><Link to="/About">About</Link></li>
                    <li><Link to="/Services">Services</Link></li>
                    <li><Link to="/Properties">Properties</Link></li>
                    <li><Link to="/Contact">Contact</Link></li>
                </ul>
            </nav>
            <div className="address">
                <h1>CRAFT DEVELOPMENT CORPORATION</h1>
                <p>10 Queen Elizabeth Boulevard, Unit 2</p>
                <p>Toronto, Ontario</p>
                <p>M8Z 1L8 Canada</p>
            </div>
            <div className="phone">
                <h1>PHONE</h1>
                <p>(416)-979-9996</p>
            </div>
            <div className="fax">
                <h1>FAX</h1>
                <p>(416)-979-0593</p>
            </div>
            <div className="tollFree">
                <h1>TOLL-FREE</h1>
                <p>1-866-979-9996</p>
            </div>
            <div className="email">
                <h1>EMAIL</h1>
                <p>INFO@CRAFTDEVELOPMENT.CA</p>
            </div>
            <img src={tempURL} alt="CRAFT Logo" />
            <div className="credit">
                <p>
                    Copyright (C) (Year) CRAFT DEVELOPMENT CORPORATION. ALL RIGHTS RESERVED. 
                    <Link to="/Privacy_Policy">PrivacyPolicy.</Link>
                </p>
                <p>WEBSITE DESIGN BY PXPPYHILL ART & DESIGN. DEVELOPMENT BY NICHOLAS PEDRO.</p>
            </div>
        </div>
    )
}

export default FootBar