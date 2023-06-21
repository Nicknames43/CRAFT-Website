import React from "react"
import {Link} from "react-router-dom"
import "../assets/NavBar.scss";
import tempURL from "/images/temp.jpg"

function NavBar(){
    return (
        <nav id="navBar">
            <Link to="/"><img src={tempURL} alt="Home" /></Link>
            <ul> 
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Services">Services</Link></li>
                <li><Link to="/Properties">Properties</Link></li>
                <li><Link to="/Contact">Contact</Link></li>
            </ul>
        </nav>
    )
}

export default NavBar