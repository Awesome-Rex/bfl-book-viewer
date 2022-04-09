import React from 'react'
import PointCounter from './PointCounter';

import "./progress.scss";

export default function Slider() {
    return (
        <div className="progress">
            <div className="background"></div>

            <div className="zone"></div>

            <input className="slider" type="range" />
            <PointCounter/>
        </div>
    );
}
