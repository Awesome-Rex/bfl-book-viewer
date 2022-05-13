import React, { CSSProperties, useEffect, useRef, useState } from "react";
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
    const reserves = useRef<object>();
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
    }, []);

	return (
		<div className={`scroll-container-${type} ${className ?? ""}`} style={{...style, ...reserves} as CSSProperties}>
            {children}
		</div>
	);
}
