import React, { CSSProperties } from 'react'
import "./rect-link.scss";

export default function RectLink(
    { 
        title = "", 
        subtitle = "", 
        icon = "", 
        background = "white", 
        href = "", 
        children: description = <></>, 
        className = ""
    }: { 
        title: string, 
        subtitle?: string, 
        icon: string, 
        background?: string, 
        href?: string, 
        children?: React.ReactNode, 
        className?: string 
    }) {
    return (
        <a className={`rect-link ${className}`} style={{ "--background": background } as CSSProperties} href={href}>
            <img className="icon" src={icon} alt="" />
            <span className="title">{title}</span>
            {subtitle != "" && <span className="subtitle">{subtitle}</span>}
            <div className="description">
                {description}
            </div>
        </a>
    )
}