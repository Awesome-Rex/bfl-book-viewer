import React, { useEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';

export default function useGlobalResizeObserver(
    selector: string,
    callback: ResizeObserverCallback,
    options?: ResizeObserverOptions
) {
    useEffect(() => {
        //mount
        const observer = new ResizeObserver(callback);
        document.querySelectorAll(selector).forEach(node => {
            if ((node as Element).matches(selector)) {
                observer.observe(node, options)
            }
        });
        
        //update
        const childListObserver = new MutationObserver((mutations) => { // observe newly created elements under selector
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach(node => {
                    if ((node as Element).matches(selector)) {
                        observer.observe(node as Element, options);
                    }
                });
            });
        });
        childListObserver.observe(document, {childList: true});

        //unmount
        return () => {
            observer.disconnect();
            childListObserver.disconnect();
        };
    }, [/*selector, type, */ options]);
}
