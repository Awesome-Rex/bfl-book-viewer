import React from "react";

export default function useMutationObserver (
    ref: Node | Element,
    callback: (entries?: MutationRecord[], observer?: MutationObserver) => void,
    options?: MutationObserverInit | undefined
) {
    React.useEffect(() => {
        if (ref) {
            //mount
            const observer = new MutationObserver(callback);

            //update
            observer.observe(ref, options);

            //unmount
            return () => observer.disconnect();
        }
    }, [callback, options]);
};
