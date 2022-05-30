import React, { useEffect, useRef, useState } from "react";

export default function useSetComputedStyle(ref: Element, property: string, value: string | number | null, deps?: React.DependencyList) {
	useEffect(() => {
        (ref as HTMLElement)?.style.setProperty(property, typeof value === "number" ? value.toString() : value);
    }, [ref]);
    
    const [computedStyle, setComputedStyle] = useState<string>("");
    
    useEffect(() => {
        if (ref) setComputedStyle(window.getComputedStyle(ref).getPropertyValue(property));
    }, deps != undefined ? deps.concat(ref) : [ref]); //****************** MAY NOT POSSIBLY WORK__________________

    return computedStyle;
}
