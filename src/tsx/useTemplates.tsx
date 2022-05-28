import React, { useRef } from 'react'
import useGlobalEventListener from './hooks/useGlobalEventListener';

export default function useTemplates() {
    return useRef(
        <>

        </>
    ).current;
}
