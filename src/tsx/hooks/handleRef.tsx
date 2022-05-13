import React, { ForwardedRef, MutableRefObject, useEffect, useRef } from "react";

export default function handleRef<T extends HTMLElement>(refs?: MutableRefObject<T>[], forwardRef?: ForwardedRef<T>, handler?: (refs?: MutableRefObject<T>[], forwardRef?: ForwardedRef<T>) => void) {
    return (node: T | null) => {
        if (refs) refs.forEach(ref => ref.current = node!);

        if (typeof forwardRef === 'function') {
            forwardRef(node);
        } else if (forwardRef) {
            (forwardRef as MutableRefObject<T>).current = node!;
        }

        if (handler) handler(refs, forwardRef);
    };
}
