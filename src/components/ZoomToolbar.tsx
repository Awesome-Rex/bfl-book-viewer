import React from "react";

// import zoomInSVG from "../assets/images/PlusInvert.svg";
// import zoomOutSVG from "../assets/images/MinusInvert.svg";

export function ZoomToolbar() {
    return (
        <div className="zoom-toolbar page-banner">
            <div>
                <input type="button" className="zoom out" style={{
                    backgroundImage: `url(${require("../assets/images/MinusInvert.svg")})`
                }} />
                <input type="range" className="slider" min="0" max="100" />
                <input type="button" className="zoom in" style={{
                    backgroundImage: `url(${require("../assets/images/PlusInvert.svg")})`
                }} />
            </div>
        </div>
    );
}