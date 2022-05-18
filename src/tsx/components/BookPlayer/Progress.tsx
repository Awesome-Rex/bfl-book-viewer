import React, { useContext } from 'react'
import { BookPlayerContext } from './BookPlayer';
import PointCounter from './PointCounter';

import "./progress.scss";

export default function Progress() {
    const context = useContext(BookPlayerContext);

    return (
        <div className="progress">
            <div className="background"></div>

            <div className="zone"></div>

            <input className="slider" type="range" />
            <PointCounter/>
        </div>
    );
}
