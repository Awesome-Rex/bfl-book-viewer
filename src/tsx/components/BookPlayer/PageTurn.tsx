import React, { useContext, useRef, useState } from "react";
import DOMManagement from "src/ts/helpers/DOMManagement";
import { PageLayout } from "src/ts/models/BookSource";
import useRefEventListener from "src/tsx/hooks/EventListener/useRefEventListener";
import useSwitchCallback from "src/tsx/hooks/Utility/useSwitchCallback";
import { BookPlayerContext } from "./BookPlayer";

export default function PageTurn({modify, arrowImage}: {modify: number, arrowImage: string}) {
    // context
    const context = useContext(BookPlayerContext);

    // refs
    const pageTurnRef = useRef<HTMLDivElement>(null!);
    const pageZoneRef = useRef<HTMLDivElement>(null!);

    // state
    const [hover, setHover] = useState<boolean>(false);
    const switchHover = useSwitchCallback(() => {
        setHover(true)
    }, () => {
        setHover(false)
    }, false, false, 2000);
    const [active, setActive] = useState<boolean>(false);
    const switchActive = useSwitchCallback(() => {
        setActive(true);
    }, () => {
        setActive(false);
    }, false, false);

    // effects

    // events
    useRefEventListener(document, "mousemove", e => { //page zone hover
		if (DOMManagement.mouseHover(pageZoneRef.current, e)) {
            switchHover.burst(2000);
        } else { // turn off hover when mouse leaves
            switchHover.off();
        }
	});

	useRefEventListener(document, "pointerdown", e => { // page zone active + press
		if (DOMManagement.mouseHover(pageZoneRef.current, e)) {
            switchActive.lockOn();
            switchHover.lockOn();

            document.addEventListener("pointerup", e => {
                switchActive.lockOff();

                if (DOMManagement.mouseHover(pageZoneRef.current, e)) {
                    // action
                    context.setProgress(progress => {
                        progress.currentView += modify;
                        return progress;
                    });

                    context.switchProgressNear.burst(2000);
                    switchHover.unlock();
                    switchHover.burst(2000, true);
                }
            }, {once: true});
        }
	});

    return (
        <div 
            className={`page-turn next ${hover ? "-hover" : ""} ${active ? "-active" : ""}`} 
            style={{width: context.progress.source.pageLayout != PageLayout.Single ? "50%" : "100%"}}
            ref={pageTurnRef}
        >
            <div className="background"></div>
            
            <div className="zone" ref={pageZoneRef}></div>
            
            <div className="active"></div>
            <img className="arrow" src={arrowImage} alt="" />
        </div>
    );
}
