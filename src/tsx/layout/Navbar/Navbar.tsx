import React, { useState } from 'react';
import "./navbar.scss";

export default function Navbar({
    entries
}: {
    entries: { name: string, href: string }[]
}) {
    const [expanded, setExpanded] = useState<boolean>(false);

    return (
        <header id="navbar">
            <div className="content">
                <nav className="left-navbar">
                    <a href="http://thebfl.org/"><img id="navbar-logo" src={require("src/assets/images/BLACKSTONE-LOGO.png")} alt="The Black Stone Foundation Library" /></a>

                    <input 
                        className="toggle" 
                        type="checkbox" 
                        checked={expanded}
                        onChange={() => setExpanded(prev => !prev)}
                    />
                </nav>
                <nav className={`right-navbar ${expanded ? "-active" : ""}`}>
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
