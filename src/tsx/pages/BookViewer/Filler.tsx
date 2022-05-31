import React, { ReactNode, useEffect, useRef } from "react";
import useComputedUnitRatio from "src/tsx/hooks/ComputedStyle/useComputedUnitRatio";
import useRefResizeObserver from "src/tsx/hooks/ResizeObserver/useRefResizeObserver";
import useForceUpdate from "src/tsx/hooks/Utility/useForceUpdate";
import "./filler.scss";

export default function Filler({
    icon,
    children
}: {
    icon: string,
    children?: React.ReactNode
}) {
    const forceUpdate = useForceUpdate();

    const fillerRef = useRef<HTMLDivElement>(null!);

	return (
        <div 
            ref={fillerRef}
            className="page-filler -theme-dark"
            style={{
                fontSize: useComputedUnitRatio(fillerRef.current, "1.1rem", "500px", fillerRef.current?.clientWidth)
            }}
        >
            <div className="content">
                <img className="icon" src={icon} draggable="false"/>
                <div className="textual">
                    {children}
                </div>
            </div>
        </div>
    );
}
