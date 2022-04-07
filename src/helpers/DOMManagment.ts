export default class DOMManager {
    static mouseHover(element: Element, event: any): boolean {
        let rect = element.getBoundingClientRect();
    
        return (
            event.clientX >= rect.left && event.clientX <= rect.right &&
            event.clientY >= rect.top && event.clientY <= rect.bottom
        );
    }
    
    static overflowX(element: Element): boolean {
        return element.scrollWidth > element.clientWidth;
    }
    static overflowY(element: Element): boolean {
        return element.scrollHeight > element.clientHeight;
    }
    static overflow(element: Element): boolean {
        return this.overflowX(element) || this.overflowY(element);
    }
    
    static getMetaImg(url: string, callback: Function) {
        const img = new Image();
        img.src = url;
        img.onload = function () { 
            callback((this as any).width, (this as any).height); 
        }
    }
}

