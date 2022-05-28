import React, { useEffect, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useGlobalEventListener(
    selector: string, 
    type: TypeManagement.EventType,
    callback: EventListenerOrEventListenerObject, 
    options?: boolean | AddEventListenerOptions | undefined
    ) {
    useEffect(() => {
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
        return () => {
            document.removeEventListener(type, handleEvent);
        }
    }, [/*selector, type, *//*callback,*/ options]);
}
