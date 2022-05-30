import React, { useEffect, useRef, useState } from "react";

export default function useGetComputedStyle(ref: Element, property: string, deps?: React.DependencyList) {
	const [computedStyle, setComputedStyle] = useState<string>("");
    
    useEffect(() => {
        if (ref) setComputedStyle(window.getComputedStyle(ref).getPropertyValue(property));
    }, deps != undefined ? deps.concat(ref) : [ref]); //****************** MAY NOT POSSIBLY WORK__________________

    return computedStyle;
}
