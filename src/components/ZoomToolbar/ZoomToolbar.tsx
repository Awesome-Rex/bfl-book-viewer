import React from "react";
import "./zoom-toolbar.scss";

import _zoomInPATH from "assets/images/PlusInvert.svg";
import _zoomOutPATH from "assets/images/MinusInvert.svg";

export default function ZoomToolbar() {
    return (
        <div className="zoom-toolbar page-banner">
            <div>
                <input type="button" className="zoom out" style={{backgroundImage: `url(${_zoomOutPATH})`}} />
                <input type="range" className="slider" min="0" max="100" />
                <input type="button" className="zoom in" style={{backgroundImage: `url(${_zoomInPATH}`}} />
            </div>
        </div>
    );
}