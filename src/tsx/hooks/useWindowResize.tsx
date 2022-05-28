import { debug } from 'console';
import React, { useEffect, useReducer, useState } from 'react';
import useRefEventListener from './useRefEventListener';

export default function useWindowResize(callback?: (width?: number, height?: number) => void, options?: boolean | AddEventListenerOptions | undefined) {
    const [size, dispatchSize] = useReducer((state: [number, number]) => {
        state = [window.innerWidth, window.innerHeight];
        if (callback != undefined) callback(...state);
        return state;
    }, [window.innerWidth, window.innerHeight]);

    const [get, set] = useReducer((state: number, action: object) => {
        return state;
    }, 10);

    useRefEventListener(window, "resize", () => dispatchSize(), options);
    useRefEventListener(window, "change", () => dispatchSize(), options);
    /* deprecated */useRefEventListener(window, "orientationchange", () => dispatchSize(), options);
    // /* deprecated */window.orientation.addEventListener("change", e => callback(e), options);

    return size;
}
