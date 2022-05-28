import React, { useEffect } from "react";

export default function useRefMutationObserver (
    ref: Node,
    callback: MutationCallback,
    options?: MutationObserverInit
) {
    useEffect(() => {
        if (ref != undefined) {
            //mount
            const observer = new MutationObserver(callback);

            //update
            observer.observe(ref, options);

            //unmount
            return () => observer.disconnect();
        }
    }, [ref, options]);
};
