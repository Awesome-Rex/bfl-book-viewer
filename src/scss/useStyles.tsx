import React, { useCallback, useEffect, useRef } from "react";
import useGlobalEventListener from "src/tsx/hooks/useGlobalEventListener";
import useGlobalMutationObserver from "src/tsx/hooks/useGlobalMutationObserver";
import useRefMutationObserver from "src/tsx/hooks/useRefMutationObserver";

import "./main.scss"

export function useStyles(){
    useEffect(() => {
        //document.documentElement.style.setProperty("--viewport-height-fill", window.innerHeight + "px");
        document.documentElement.style.setProperty("--viewport-height-fill", document.documentElement.clientHeight + "px");
    }, []);

    useGlobalMutationObserver("input[type='range']", (mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type == "attributes") {
                const element = mutation.target as HTMLInputElement;
                const progress: number = (parseFloat(element.value) - parseFloat(element.min)) / (parseFloat(element.max) - parseFloat(element.min));
                
                element.style.setProperty("--range-progress", `${progress * 100}%`);
            }
        });
    }, {attributes: true, attributeFilter: ["value"]})

    useGlobalEventListener("input[type='number']", "keyup" /*"change"*/, event => {
        if ((event as KeyboardEvent).key === "Enter") {
            const element = event.target as HTMLInputElement;
            const clamped = Math.min(Math.max(parseFloat(element.value), parseFloat(element.min)), parseFloat(element.max));
            
            element.value = clamped.toString();
        }
    });
    useGlobalEventListener("input[type='number']", "blur" /*"change"*/, event => {
        const element = event.target as HTMLInputElement;
        const clamped = Math.min(Math.max(parseFloat(element.value), parseFloat(element.min)), parseFloat(element.max));
        
        element.value = clamped.toString();
    });

    return useRef(
        <>
            {/* <link type="text/css" rel="stylesheet" href="./main.scss"/> */}
        </>
    ).current;
}