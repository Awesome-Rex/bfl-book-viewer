import React, { CSSProperties } from 'react'
import "./article-content.scss";

export default function ArticleContent({
    container,
    content,
    children
}: {
    container?: {
        className?: string,
        style?: CSSProperties
    },
    content?: {
        className?: string,
        style?: CSSProperties
    },
    children?: React.ReactNode
}) {
    return (
        <div className={`article-content ${container?.className ?? ""}`} style={{...container?.style}}>
            <div className={content?.className ?? ""} style={content?.style}>
                {children}
            </div>
        </div>
    );
}