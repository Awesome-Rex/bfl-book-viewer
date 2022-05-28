import React, { useEffect } from "react";

export default function useRefResizeObserver (
    ref: Element,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
) {
    useEffect(() => {
        if (ref != undefined) {
            //mount
            const observer = new ResizeObserver(callback);

            //update
            observer.observe(ref, options);

            //unmount
            return () => observer.disconnect();
        }
    }, [ref, options]);
};