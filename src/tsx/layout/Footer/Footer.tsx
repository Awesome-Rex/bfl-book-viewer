import React from "react";
import "./footer.scss";

export default function Footer({ }) {
    return (
        <footer id="footer" className="-theme-dark">
            <section className="primary">
                <div className="content">
                    <div className="description">
                        {/* footer */}
                        <p>Toll-free (844) 72-BOOKS</p>
                        {/* <br/> */}
                        <p>With support from The Youth Opportunities Fund = Ontario Trillium Foundation and ACSA</p>
                        {/* <br/> */}
                        <p>© 2020 The Blackstone Foundation Library.</p>
                        {/* <br/> */}
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
