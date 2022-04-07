import React from "react";
import "./book-player.scss";

// https://jakearchibald.github.io/svgomg/
import _arrowLeftPATH from "assets/images/ArrowLeft.svg";
import _arrowRightPATH from "assets/images/ArrowRight.svg";

export default function BookPlayer({ }) {
    return (
        <div className="book-player">
            <div className="page" draggable="false">
                <img draggable="false" src={require("assets/books/The Cat in the Hat/THE-CAT-IN-THE-HAT-03.png")} alt="Book page" />
            </div>

            <div className="page-turn next">
                <div className="background"></div>

                <div className="zone"></div>

                <div className="active"></div>
                <img className="arrow" src={_arrowRightPATH} alt="" />
            </div>

            <div className="page-turn last">
                <div className="background"></div>

                <div className="zone"></div>

                <div className="active"></div>
                <img className="arrow" src={_arrowLeftPATH} alt="" />
            </div>

            <div className="progress">
                <div className="background"></div>

                <div className="zone"></div>

                <input className="slider" type="range" />
                <div className="point-counter -theme-dark">
                    <div className="head">
                        <span>
                            <input className="page" type="number" />
                            <span className="divide"></span>
                            <span className="max"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}