import React, { useEffect } from "react";

export default function useResizeObserver (
    ref: Element | SVGElement,
    callback: (entries?: ResizeObserverEntry[], observer?: ResizeObserver) => void,
    options?: object
) {
    React.useEffect(() => {
        if (ref) {
            //mount
            const observer = new ResizeObserver(callback);

            //update
            observer.observe(ref, options);

            //unmount
            return () => observer.disconnect();
        }
    }, [callback]);
};