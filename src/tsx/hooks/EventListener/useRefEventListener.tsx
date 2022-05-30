import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useRefEventListener(
    ref: EventTarget, 
    type: TypeManagement.EventType, 
    callback: EventListenerOrEventListenerObject, 
    options?: boolean | AddEventListenerOptions | undefined
) {
    const removeEventListener = useRef<(() => void) | undefined>(undefined);

    useEffect(() => {
        if (ref != undefined) {
            // disconnect on restart useEffect
            if (removeEventListener.current != undefined) removeEventListener.current();

            // event handler
            const handleEvent = callback;

            //update
            ref.addEventListener(type, handleEvent);

            //unmount
            removeEventListener.current = () => ref.removeEventListener(type, handleEvent);
            return removeEventListener.current;
        }
    }, [ref,/* type, *//*callback,*/ options]);
}
