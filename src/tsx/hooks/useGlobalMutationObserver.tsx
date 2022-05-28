import React, { useEffect, useRef, useState } from 'react';
import { TypeManagement } from 'src/ts/helpers/TypeManagement/TypeManagement';
import useRefMutationObserver from './useRefMutationObserver';

export default function useGlobalMutationObserver(
    selector: string,
    callback: MutationCallback,
    options?: MutationObserverInit
) {
    useEffect(() => {
        //mount
        const observer = new MutationObserver(callback);
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
