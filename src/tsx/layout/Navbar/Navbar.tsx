import React from 'react';
import "./navbar.scss";

import _hamburgerPATH from "src/assets/images/Hamburger.svg";

export default function Navbar(
    {
        entries
    }: {
        entries: { name: string, href: string }[]
    }) {
    return (
        <header id="navbar">
            <div className="content">
                <nav className="left-navbar">
                    <a href="http://thebfl.org/"><img id="navbar-logo" src={require("src/assets/images/BLACKSTONE-LOGO.png")} alt="The Black Stone Foundation Library" /></a>

                    <input className="toggle" type="checkbox" style={{ backgroundImage: `url(${_hamburgerPATH})` }} />
                </nav>
                <nav className="right-navbar">
                    <div className="content">
                        {entries.map(entry =>
                            <a key={entry.name} href={entry.href}><h2>{entry.name}</h2></a>
                        )}
                    </div>
                </nav>
            </div>
        </header>
    )
}
