import React, { useEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';
import useRefMutationObserver from './useRefMutationObserver';

export default function useGlobalIntersectionObserver(
    selector: string,
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
) {
    useEffect(() => {
        //mount
        const observer = new IntersectionObserver(callback, options);
        document.querySelectorAll(selector).forEach(node => {
            if ((node as Element).matches(selector)) {
                observer.observe(node)
            }
        });
        
        //update
        const childListObserver = new MutationObserver((mutations) => { // observe newly created elements under selector
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach(node => {
                    if ((node as Element).matches(selector)) {
                        observer.observe(node as Element);
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
