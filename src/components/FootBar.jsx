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

            <img src={tempURL} alt="CRAFT Logo" />
            <p>Copyright stuff</p>
        </div>
    )
}

export default FootBar