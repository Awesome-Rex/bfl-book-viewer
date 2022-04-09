import React from "react";

import "./point-counter.scss";

export default function PointCounter() {
  return (
    <div className="point-counter -theme-dark">
      <div className="head">
        <span>
          <input className="page" type="number" />
          <span className="divide"></span>
          <span className="max"></span>
        </span>
      </div>
    </div>
  );
}
