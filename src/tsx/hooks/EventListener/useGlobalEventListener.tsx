import React, { useEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useGlobalEventListener(
    selector: string, 
    type: TypeManagement.EventType,
    callback: EventListenerOrEventListenerObject, 
    options?: boolean | AddEventListenerOptions | undefined
) {
    const removeEventListener = useRef<(() => void) | undefined>(undefined);

    useEffect(() => {
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
        document.addEventListener(type, handleEvent);

        //unmount
        removeEventListener.current = () => document.removeEventListener(type, handleEvent);
        return removeEventListener.current;
    }, [/*selector, type, *//*callback,*/ options]);
}
