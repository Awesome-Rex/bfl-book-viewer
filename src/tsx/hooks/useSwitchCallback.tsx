import React, { useCallback, useRef } from "react";

export interface SwitchRef {
    on: () => void;
    off: () => void;
    burst: (ms?: number) => void;
    sustain: () => void;
    readonly toggled: boolean;

    lockOn: () => void;
    lockOff: () => void;
    lock: (state?: boolean) => void;
    unlock: () => void;
    readonly locked: boolean;
}

export default function useSwitchCallback<SwitchRef>(
    onCallback: () => void, 
    offCallback: () => void, 

    initialToggled: boolean = false, 
    initialLock: boolean = false, 
    defaultMs: number = 2000
) {
    const toggled = useRef<boolean>(initialToggled);
    const locked = useRef<boolean>(initialLock);
    const timeout = useRef<NodeJS.Timeout | undefined>(undefined);
    
    const on = useCallback(() => {
        if (!locked.current) {
            toggled.current = true;
            onCallback();
        }
    }, []);
    const off = useCallback(() => {
        if (!locked.current) {
            toggled.current = false;
            offCallback();
        }
    }, []);
    const burst = useCallback((ms: number = defaultMs, from: boolean = true) => {
        if (!locked.current) {
            // sustain
            sustain();

            // action
            if (from == true) on();
            if (from == false) off();

            // lift
            if (from == true) timeout.current = setTimeout(off, ms);
            if (from == false) timeout.current = setTimeout(on, ms);
        }
    }, []);
    const sustain = useCallback(() => {
        if (!locked.current) {
            if (timeout.current != undefined) { clearTimeout(timeout.current); timeout.current = undefined; }
        }
    }, []);

    const lockOn = useCallback((unlock: boolean = false) => {
        locked.current = true;
        toggled.current = true;
        onCallback();
        if (unlock) locked.current = false;
    }, []);

    const lockOff = useCallback((unlock: boolean = false) => {
        locked.current = true;
        toggled.current = false;
        offCallback();
        if (unlock) locked.current = false;
    }, []);
    const lock = useCallback((state?: boolean) => {
        if (state == undefined) locked.current = true; 
        else if (state == true) lockOn(false);
        else if (state == false) lockOff(false);
    }, []);
    const unlock = useCallback(() => {
        locked.current = false;
    }, []);

    return {
        on,
        off,
        burst,
        sustain,
        get toggled() {
            return toggled.current;
        },

        lockOn,
        lockOff,
        lock,
        unlock,
        get locked(){
            return locked.current;
        }
    }
}
