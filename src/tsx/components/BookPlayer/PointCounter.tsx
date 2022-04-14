import React, { useContext } from "react";
import { BookPlayerContext } from "./BookPlayer";

import "./point-counter.scss";

export default function PointCounter() {
  const context = useContext(BookPlayerContext);

  return (
    <div className="point-counter -theme-dark">
      <div className="head">
        <span>
          <input className="page " type="number" />
          <span className="dash static"><span></span></span>
          <input className="page" type="number" />
          <span className="divide static"><span></span></span>
          <span className="max"></span>
        </span>
      </div>
    </div>
  );
}
