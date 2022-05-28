import React, { CSSProperties, useEffect, useRef, useState } from "react";
import useRefEventListener from "src/tsx/hooks/useRefEventListener";
import useSelectorEventListener from "src/tsx/hooks/useSelectorEventListener";
import "./scroll-container.scss";

enum ScrollType {x = "x", y = "y"};
enum ScrollCut {Bit = "bit", Chunk = "chunk", Partial = "partial", Segment = "segment", Screen = "screen"}
export default function ScrollContainer({ 
    type = ScrollType.x,
    reserveTop = "1em",
    reserveBottom = "1em",
    reserveLeft = "1em",
    reserveRight = "1em",
    className,
    style = {},
    children = <></>
}: {
    type?: ScrollType,
    reserveTop?: string | ScrollCut,
    reserveBottom?: string | ScrollCut,
    reserveLeft?: string | ScrollCut,
    reserveRight?: string | ScrollCut,
    className?: string,
    style?: CSSProperties,
    children?: React.ReactNode
}) {
    const scrollContainerRef = useRef<HTMLDivElement>(null!);

    const reserves = useRef<{
        "--reserve-top"?: string | number,
        "--reserve-bottom"?: string | number,
        "--reserve-left"?: string | number,
        "--reserve-right"?: string | number
    } | undefined>(undefined);
    useEffect(() => {
        if (type == ScrollType.x) {
            reserves.current = {
                "--reserve-top": reserveTop,
                "--reserve-bottom": reserveBottom
            };
        }
        if (type == ScrollType.y) {
            reserves.current = {
                "--reserve-left": reserveLeft,
                "--reserve-right": reserveRight
            };
        }
    }, [reserveTop, reserveBottom, reserveLeft, reserveRight]);
    
    useSelectorEventListener(scrollContainerRef.current, "input", "input", event => { //-------May need to accomodate for multiple nested .scroll-container parents
        if (event) {
            const element = event.target as HTMLInputElement;

            // modify
            scrollContainerRef.current.style.setProperty(`overflow-${type}`, "hidden");
            
            // release
            element.addEventListener("change", () => {
                scrollContainerRef.current.style.setProperty(`overflow-${type}`, "scroll");
            }, { once: true });
        }
    });

	return (
		<div className={`scroll-container-${type} ${className ?? ""}`} style={{...style, ...reserves} as CSSProperties} ref={scrollContainerRef}>
            {children}
		</div>
	);
}
