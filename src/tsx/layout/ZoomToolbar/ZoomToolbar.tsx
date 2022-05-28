import React, { useContext, useEffect, useState } from "react";
import "./zoom-toolbar.scss";

import PageBanner from "../PageBanner";

import { BookViewerContext } from "src/tsx/pages/BookViewer/BookViewer";

export default function ZoomToolbar({zoom, setZoom}: {zoom: number, setZoom: React.Dispatch<React.SetStateAction<number>>}) {
    // const [value, setValue] = useState<number>(0);
    // useEffect(() => setValue(zoom), [zoom]);

    function modifyZoom (modification: number) {
        setZoom((prevZoom: number | string) => {
            return (Math.round((parseFloat(prevZoom.toString()) + modification) / Math.abs(modification)) * Math.abs(modification));
        });
    }

    return (
        <PageBanner banner={{className: "zoom-toolbar"}}>
            <input 
                type="button" 
                className="zoom out" 
                onClick={e => modifyZoom(-0.2)}
            />
            <input 
                type="range" 
                className="slider" 
                min="0" 
                max="1" 
                step="0.01" 
                value={zoom}
                onChange={e => setZoom(parseFloat(e.target.value))}
                // value={value} 
                // onChange={e =>setValue(parseFloat(e.target.value))}
                // onPointerUp={e => setZoom(parseFloat((e.target as HTMLInputElement).value))}
            />
            <input
                type="button" 
                className="zoom in" 
                onClick={e => modifyZoom(0.2)}
            />
        </PageBanner>
    );
}