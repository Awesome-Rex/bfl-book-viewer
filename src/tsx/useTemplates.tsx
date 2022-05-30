import React, { useRef } from 'react'
import useGlobalEventListener from './hooks/EventListener/useGlobalEventListener';

export default function useTemplates() {
    return useRef(
        <>

        </>
    ).current;
}
