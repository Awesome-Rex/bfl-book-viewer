import React, { useEffect } from "react";

export default function useRefIntersectionObserver (
    ref: Element,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    useEffect(() => {
        if (ref != undefined) {
            //mount
            const observer = new IntersectionObserver(callback, options);

            //update
            observer.observe(ref);

            //unmount
            return () => observer.disconnect();
        }
    }, [ref, options]);
};