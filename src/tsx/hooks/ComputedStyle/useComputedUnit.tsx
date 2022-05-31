import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import DOMManagement from "src/ts/helpers/DOMManagement";
import useRefResizeObserver from "../ResizeObserver/useRefResizeObserver";

export enum UnitDimension {
    Width = "width", 
    Height = "height"
};

export default function useComputedUnit(
    context: HTMLElement, 
    measure: string | number | undefined, 
    dimension: UnitDimension = UnitDimension.Width
): number {
    const dimensionRef = useRef<HTMLElement>((() => {
        const ref = document.createElement("i");
        ref.style.display = "inline-block";
        ref.style.position = "absolute";
        ref.style.visibility = "hidden";
        ref.style.fontStyle = "normal";
        
        return ref;
    })());
    const [pxMeasure, setPxMeasure] = useState<number>(0);

    useLayoutEffect(() => { // add to dom
        dimensionRef.current.remove();
        context?.parentElement?.appendChild(dimensionRef.current);
    }, [context]);
    
    useLayoutEffect(() => { // set dimensions
        if (dimension == UnitDimension.Width) dimensionRef.current.style.width = DOMManagement.streamlineUnits(measure);
        if (dimension == UnitDimension.Height) dimensionRef.current.style.height = DOMManagement.streamlineUnits(measure);
    }, [measure, dimension])

    useRefResizeObserver(dimensionRef.current, () => { // record dimensions
        setPxMeasure(
            dimension == UnitDimension.Width ? dimensionRef.current.clientWidth :
            dimension == UnitDimension.Height ? dimensionRef.current.clientHeight : 
            0
        );
    });

    return pxMeasure; // returns dimensions
}
