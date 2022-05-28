import { TypeManagement } from "../TypeManagement/TypeManagement";

export namespace EventManagement {
    export function addGlobalEventListener(type: TypeManagement.EventType, selector: string, callback: Function, options: object) {
        document.addEventListener(type, (e: any) => {
            if (e.target.matches(selector)) {
                callback(e);
            }
        }, options);
    }
    export function startEventListener(type: TypeManagement.EventType, selector: string, callback: Function, options: {}) {
        document.addEventListener("DOMContentLoaded", (e: any) => callback(e));
        addGlobalEventListener(type, selector, (e: any) => callback(e), options);
    }
    export function startResize(callback: Function, options?: boolean | AddEventListenerOptions | undefined) {
        document.addEventListener("DOMContentLoaded", e => callback(e));
        window.addEventListener("resize", e => callback(e), options);
        window.screen.orientation.addEventListener("change", e => callback(e), options);
        /* deprecated */window.addEventListener("orientationchange", e => callback(e), options);
        // window.orientation.addEventListener("change", e => callback(e), options);
    }
}