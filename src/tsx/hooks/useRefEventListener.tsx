import React, { useEffect, useLayoutEffect, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useRefEventListener(
    ref: EventTarget, 
    type: TypeManagement.EventType, 
    callback: EventListenerOrEventListenerObject, 
    options?: boolean | AddEventListenerOptions | undefined
) {
    useEffect(() => {
        if (ref != undefined) {
            // event handler
            const handleEvent = callback;

            //update
            ref.addEventListener(type, handleEvent);

            //unmount
            return () => {
                ref.removeEventListener(type, handleEvent);
            }
        }
    }, [ref,/* type, *//*callback,*/ options]);
}
