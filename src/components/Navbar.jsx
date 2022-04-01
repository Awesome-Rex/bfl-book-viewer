import React from 'react';

import hamburgerSVG from "../assets/images/Hamburger.svg";

export default function Navbar() {
  return (
    <header id="navbar">
        <div className="content">
            <nav className="left-navbar">
                <a href="http://thebfl.org/"><img id="navbar-logo" src={require("../assets/images/BLACKSTONE-LOGO.png")} alt="The Black Stone Foundation Library"/></a>

                <input className="toggle" type="checkbox" style={{backgroundImage: `url(${hamburgerSVG})`}}/>
            </nav>
            <nav className="right-navbar">
                <div className="content">
                    <a href="http://thebfl.org/"><h2>Home</h2></a>
                    <a href="https://blackstonefoundationlibrary.overdrive.com/"><h2>Read</h2></a>
                    <a href="https://www.knowledgebookstore.com/"><h2>Purchase</h2></a>
                    <a href="http://thebfl.org/"><h2>About Us</h2></a>
                    <a href="http://thebfl.org/"><h2>Contact</h2></a>
                </div>
            </nav>
        </div>
    </header>
  )
}
