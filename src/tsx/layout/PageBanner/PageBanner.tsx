import React, { CSSProperties, ForwardedRef, forwardRef } from 'react'
import "./page-banner.scss";

const PageBanner = forwardRef(({
    banner = {}, 
    content = {}, 
    children = <></>
}: {
    banner?: {
        className?: string,
        style?: CSSProperties | undefined
    },
    content?: {
        className?: string,
        style?: CSSProperties | undefined
    },
    children?: React.ReactNode
}, ref: ForwardedRef<HTMLDivElement>) => {
    return (
        <div className={`page-banner ${banner.className}`} style={{...banner.style}} ref={ref}>
            <div className={content.className} style={content.style}>
                {children}
            </div>
        </div>
    );
});

export default PageBanner;