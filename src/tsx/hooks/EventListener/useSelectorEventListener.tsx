import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useSelectorEventListener(
    ref: EventTarget, 
    selector: string, 
    type: TypeManagement.EventType, 
    callback: (e?: Event) => void, options?: boolean | AddEventListenerOptions | undefined
) {
    const removeEventListener = useRef<(() => void) | undefined>(undefined);

    useEffect(() => {
        if (ref != undefined) {
            // disconnect on restart useEffect
            if (removeEventListener.current != undefined) removeEventListener.current();

            // event handler
            const handleEvent = (e: Event) => {
                if ((e.target as Element).matches(selector)) {
                    if (typeof callback === "function") (callback as EventListener)(e);
                    if (typeof callback === "object") (callback as EventListenerObject).handleEvent(e);
                }
            };

            //update
            ref.addEventListener(type, handleEvent);

            //unmount
            removeEventListener.current = () => ref.removeEventListener(type, handleEvent);
            return removeEventListener.current;
        }
    }, [ref,/* selector, type, *//*callback,*/ options]);
}
