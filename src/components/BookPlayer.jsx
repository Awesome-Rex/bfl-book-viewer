import React from "react";

// https://jakearchibald.github.io/svgomg/
import arrowLeftSVG from "../assets/images/ArrowLeft.svg";
import arrowRightSVG from "../assets/images/ArrowRight.svg";

export default function BookPlayer({}) {
    return (
        <div className="book-player">
            <div className="page" draggable="false">
                <img draggable="false" src={require("../assets/books/The Cat in the Hat/THE-CAT-IN-THE-HAT-03.png")} alt="Book page"/>
            </div>

            <div className="page-turn next">
                <div className="background"></div>

                <div className="zone"></div>

                <div className="active"></div>
                <img className="arrow" src={arrowRightSVG} alt=""/>
            </div>

            <div className="page-turn last">
                <div className="background"></div>

                <div className="zone"></div>

                <div className="active"></div>
                <img className="arrow" src={arrowLeftSVG} alt=""/>
            </div>

            <div className="progress">
                <div className="background"></div>

                <div className="zone"></div>

                <input className="slider" type="range"/>
                <div className="point-counter -theme-dark">
                    <div className="head">
                        <span>
                            <input className="page" type="number"/> 
                            <span className="divide"></span>
                            <span className="max"></span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}