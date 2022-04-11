import React, { useEffect, useState } from 'react';

export default function useEventListener(ref: EventTarget, type: string, callback: (e?: Event) => void, options?: object) {
    useEffect(() => {
        const handleEvent = (e: Event) => {
            callback(e); //let target: Element = (e.target as Element);
        };

        //mount
        // if (onMount) handleEvent();

        //update
        ref!.addEventListener(type, handleEvent);

        //unmount
        return () => {
            ref!.removeEventListener(type, handleEvent);
        }
    }, [callback, options]);
}

// export default function useEventListener(ref: EventTarget, type: string, callback: (e?: Event) => void, useCapture: boolean = false) {
//     useEventListener(ref, type, callback, {capture: useCapture});
// }