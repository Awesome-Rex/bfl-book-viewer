export namespace DOMManagement {
    export function mouseHover(element: HTMLElement, event: any): boolean {
        let rect = element.getBoundingClientRect();

        return (
            event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom
        );
    }

    export function overflowX(element: HTMLElement): boolean {
        return element.scrollWidth > element.clientWidth;
    }
    export function overflowY(element: HTMLElement): boolean {
        return element.scrollHeight > element.clientHeight;
    }
    export function overflow(element: HTMLElement): boolean {
        return overflowX(element) || overflowY(element);
    }

    export function getMetaImg(url: string, callback: Function) {
        const img = new Image();
        img.src = url;
        img.onload = function () { 
            callback((this as any).width, (this as any).height); 
        }
    }

    export function gridRows(element: HTMLElement): number {
        return window.getComputedStyle(element).getPropertyValue("grid-template-rows").split(" ").length;
    }

    export function gridColumns(element: HTMLElement): number {
        return window.getComputedStyle(element).getPropertyValue("grid-template-columns").split(" ").length;
    }
}