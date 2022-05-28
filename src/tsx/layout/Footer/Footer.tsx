import React from "react";
import "./footer.scss";

import _arrowOutlineUpPATH from "src/assets/images/ArrowOutlineUp.svg";

export default function Footer({ }) {
    return (
        <footer id="footer" className="-theme-dark">
            <section className="primary">
                <div className="content">
                    <div className="description">
                        {/* footer */}
                        <p>Toll-free (844) 72-BOOKS</p>

                        <p>With support from The Youth Opportunities Fund = Ontario Trillium Foundation and ACSA</p>
                        <p>© 2020 The Blackstone Foundation Library.</p>
                    </div>
                    {/* <div className="social">

                    </div> */}
                </div>
            </section>
            <section className="boundary" onClick={e => window.scrollTo({top: 0, behavior: "smooth"})}>
                <div className="foreground"/>
                <span className="text">
                    <span className="icon"/>
                </span>
                {/* <div className="content">
                    
                </div> */}
            </section>
        </footer>
    );
}
