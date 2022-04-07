import React, { CSSProperties } from 'react'
import "./rect-link.scss";

export default function RectLink({ title = "", subtitle = "", icon = "", background: colour = "white", href: src = "", children: description = <></>, className = ""}: { title: string, subtitle: string, icon: string, background: string, href: string, children: any, className: string }) {
    return (
        <a className={`rect-link ${className}`} style={{ "--background": colour } as CSSProperties} href={src}>
            <img className="icon" src={icon} alt="" />
            <span className="title">{title}</span>
            {subtitle != "" && <span className="subtitle">{subtitle}</span>}
            <div className="description">
                {description}
            </div>
        </a>
    )
}