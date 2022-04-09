import React from 'react'
import "./article-content.scss";

export default function ArticleContent({
    container = {}, 
    content = {}, 
    children = <></>
}: {
    container?: {
        className?: string,
        style?: object
    },
    content?: {
        className?: string,
        style?: object
    },
    children?: React.ReactNode
} = {
    container: {
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
        <div className={`article-content ${container.className}`} style={{...container.style}}>
            <div className={content.className} style={content.style}>
                {children}
            </div>
        </div>
    );
}