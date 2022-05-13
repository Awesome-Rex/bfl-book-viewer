import React, { CSSProperties } from 'react'
import "./page-banner.scss";

export default function PageBanner({
    banner = {}, 
    content = {}, 
    children = <></>
}: {
    banner?: {
        className?: string,
        style?: CSSProperties
    },
    content?: {
        className?: string,
        style?: CSSProperties
    },
    children?: React.ReactNode
} = {
    banner: {
        className: "",
        style: {}
    },
    content: {
        className: "",
        style: {}
    },
    children: <></>
}) {
    return (
        <div className={`page-banner ${banner.className}`} style={{...banner.style}}>
            <div className={content.className} style={content.style}>
                {children}
            </div>
        </div>
    );
}