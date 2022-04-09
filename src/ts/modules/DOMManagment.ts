export function mouseHover(element: Element, event: any): boolean {
    let rect = element.getBoundingClientRect();

    return (
        event.clientX >= rect.left && event.clientX <= rect.right &&
        event.clientY >= rect.top && event.clientY <= rect.bottom
    );
}

export function overflowX(element: Element): boolean {
    return element.scrollWidth > element.clientWidth;
}
export function overflowY(element: Element): boolean {
    return element.scrollHeight > element.clientHeight;
}
export function overflow(element: Element): boolean {
    return overflowX(element) || overflowY(element);
}

export function getMetaImg(url: string, callback: Function) {
    const img = new Image();
    img.src = url;
    img.onload = function () { 
        callback((this as any).width, (this as any).height); 
    }
}