import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useSelectorEventListener(
    ref: EventTarget, 
    selector: string, 
    type: TypeManagement.EventType, 
    callback: (e?: Event) => void, options?: boolean | AddEventListenerOptions | undefined
) {
    useEffect(() => {
        if (ref != undefined) {
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
            return () => {
                ref.removeEventListener(type, handleEvent);
            }
        }
    }, [ref,/* selector, type, *//*callback,*/ options]);
}
