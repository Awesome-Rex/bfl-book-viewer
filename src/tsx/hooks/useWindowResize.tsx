import { debug } from 'console';
import React, { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

export default function useWindowResize(callback?: (width?: number, height?: number) => void) {
    const [size, setSize] = useState<[number, number]>([window.innerWidth, window.innerHeight]);

    useEventListener(window, "resize", () => {
        setSize([window.innerWidth, window.innerHeight]);
        if (callback != undefined) callback(window.innerWidth, window.innerHeight);
    });

    return size;
}
