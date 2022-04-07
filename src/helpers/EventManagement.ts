export default class EventManager {
    static addGlobalEventListener(type: string, selector: string, callback: Function, options: object) {
        document.addEventListener(type, (e: any) => {
            if (e.target.matches(selector)) {
                callback(e);
            }
        }, options);
    }
    static startEventListener(type: string, selector: string, callback: Function, options: {}) {
        document.addEventListener("DOMContentLoaded", (e: any) => callback(e));
        this.addGlobalEventListener(type, selector, (e: any) => callback(e), options);
    }
    static startResize(callback: Function, options: {}) {
        document.addEventListener("DOMContentLoaded", e => callback(e));
        window.addEventListener("resize", e => callback(e), options);
        window.screen.orientation.addEventListener("change", e => callback(e), options);
        /* deprecated */window.addEventListener("orientationchange", e => callback(e), options);
        // window.orientation.addEventListener("change", e => callback(e), options);
    }
}