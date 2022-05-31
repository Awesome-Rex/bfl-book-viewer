import React, { useContext, useEffect, useRef, useState } from 'react'
import DOMManagement from 'src/ts/helpers/DOMManagement';
import useRefEventListener from 'src/tsx/hooks/EventListener/useRefEventListener';
import { BookPlayerContext } from './BookPlayer';
import PointCounter from './PointCounter';

import "./progress.scss";

export default function Progress() {

    const context = useContext(BookPlayerContext);

    useRefEventListener(document, "mousemove", e => {
        if (DOMManagement.mouseHover(context.progressZoneRef.current, e)) {
            context.switchProgressNear.burst(2000);
        } else if (context.progressNear == true) {
            // context.burstProgressNear.burst(2000); //******************NEEDS FIXING */
            context.switchProgressNear.off();
        }
    });

    return (
        <div className={`progress ${context.progressNear ? "-near" : ""} ${context.progressHover ? "-hover" : ""} ${context.progressActive ? "-active" : ""}`}>
            <div className="background"></div>

            <div className="zone" ref={context.progressZoneRef}></div>

            <input 
                className="slider" 
                type="range" 
                min={context.progress.source.getViewRange().min}
                max={context.progress.source.getViewRange().max}
                value={context.input.entryCurrentView}
                onChange={e => {
                    context.input.setEntryCurrentView(parseFloat((e.target as HTMLInputElement).value));

                    context.setProgressActive(true);
                }}
                onPointerUp={e => {
                    context.input.setEntryCurrentView(Math.round(parseFloat((e.target as HTMLInputElement).value)));
                    
                    context.setProgress(progress => {
                        progress.currentView = Math.round(parseFloat((e.target as HTMLInputElement).value));
                        return progress;
                    });
                    
                    context.setProgressActive(false);
                }}
                onPointerOver={e => context.setProgressHover(true)}
                onPointerLeave={e => context.setProgressHover(false)}
                step={0.01}
                ref={context.sliderRef}
            />
            <span className="percent -theme-dark">{Math.round(context.progress.currentPageFullProgress * 100)}%</span>
            <PointCounter 
                style={{
                    left: `clamp(${context.pointCounterRef.current?.offsetWidth}px / 2 + 0.5rem, ${(context.input.entryCurrentView / context.progress.source.getTotalViews()) * 100}%, 100% - ${context.pointCounterRef.current?.offsetWidth}px / 2 - 0.5rem)`
                }}
                ref={context.pointCounterRef}
            />
        </div>
    );
}
