import { debug } from 'console';
import React, { useEffect, useState } from 'react';
import useEventListener from './useEventListener';

export default function useWindowResize(callback?: (mouseX?: number, mouseY?: number) => void) {
    const [position, setPosition] = useState<[number, number]>();

    useEventListener(document, "mousemove", (e: Event | undefined) => {
        setPosition([(e as MouseEvent).clientX, (e as MouseEvent).clientY]);
        if (callback != undefined) callback((e as MouseEvent).clientX, (e as MouseEvent).clientY);
    });

    return position;
}
