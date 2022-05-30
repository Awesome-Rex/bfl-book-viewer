import React, { useLayoutEffect, useRef, useState } from "react";
import useRefResizeObserver from "../ResizeObserver/useRefResizeObserver";

export enum UnitDimension {
    Width = "width", 
    Height = "height"
};

export default function useComputedUnit(ref: HTMLElement, units: string | number | undefined, dimension: UnitDimension = UnitDimension.Width): number {
    const dimensionRef = useRef<HTMLElement>((() => {
        const ref = document.createElement("div");
        ref.style.display = "inline-block";
        ref.style.position = "absolute";
        ref.style.visibility = "hidden";
        
        return ref;
    })());
    const [measure, setMeasure] = useState<number>(0);
    
    useLayoutEffect(() => {
        dimensionRef.current.remove();
        if (ref && dimensionRef) ref.parentElement?.appendChild(dimensionRef.current);
    }, [ref]);

    useLayoutEffect(() => {
        if (dimension == UnitDimension.Width) dimensionRef.current.style.width = units != undefined ? units.toString() : "auto";
        if (dimension == UnitDimension.Height) dimensionRef.current.style.height = units != undefined ? units.toString() : "auto";
    }, [dimensionRef.current, units, dimension]);
    useRefResizeObserver(dimensionRef.current, () => {
        setMeasure(
            dimension == UnitDimension.Width ? dimensionRef.current.clientWidth :
            dimension == UnitDimension.Height ? dimensionRef.current.clientHeight : 
            0
        );
    });

    return measure;
}
