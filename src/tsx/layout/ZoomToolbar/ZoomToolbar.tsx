import React, { useContext } from "react";
import "./zoom-toolbar.scss";

import PageBanner from "../PageBanner";

import _zoomInPATH from "src/assets/images/PlusInvert.svg";
import _zoomOutPATH from "src/assets/images/MinusInvert.svg";
import { BookViewerContext } from "src/tsx/pages/BookViewer/BookViewer";

export default function ZoomToolbar({bookZoom, setBookZoom}: {bookZoom: number, setBookZoom: Function}) {
    function modifyZoom (modification: number) {
        setBookZoom((prevZoom: number) => {
            return (Math.round((parseFloat(prevZoom.toString()) + modification) / Math.abs(modification)) * Math.abs(modification));
        });
    }

    return (
        <PageBanner banner={{className: "zoom-toolbar"}}>
            <input type="button" className="zoom out" style={{backgroundImage: `url(${_zoomOutPATH})`}} onClick={e => modifyZoom(-0.2)}/>
            <input type="range" className="slider" min="0" max="1" step="0.01" value={bookZoom} onChange={e => setBookZoom(e.target.value)}/>
            <input type="button" className="zoom in" style={{backgroundImage: `url(${_zoomInPATH}`}} onClick={e => modifyZoom(0.2)}/>
        </PageBanner>
    );
}