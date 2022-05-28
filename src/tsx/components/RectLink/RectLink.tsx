import React, { CSSProperties, useEffect, useLayoutEffect, useRef, useState } from 'react'
import useWindowResize from 'src/tsx/hooks/useWindowResize';
import "./rect-link.scss";

export default function RectLink(
    { 
        title = "", 
        subtitle = "", 
        icon = "", 
        background = "white", 
        href = "", 
        children: description = <></>, 
        className
    }: { 
        title: string, 
        subtitle?: string, 
        icon: string, 
        background?: string, 
        href?: string, 
        children?: React.ReactNode, 
        className?: string 
    }) {

    const element = useRef<HTMLAnchorElement>(null!);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        setHeight(element.current?.clientWidth);
    }, []);
    useWindowResize(() => {
        setHeight(element.current?.clientWidth);
    });
    
    return (
        <a 
            ref={element} 
            className={`rect-link ${className ?? ""}`} 
            style={{ 
                "--background": background,
                "--width-compare": height + "px"
            } as CSSProperties} 
            href={href}
            target="_blank" 
            rel="noopener noreferrer"
        >
            <img className="icon" src={icon} alt="" />
            <span className="title">{title}</span>
            {subtitle != "" && <span className="subtitle">{subtitle}</span>}
            <div className="description">
                {description}
            </div>
        </a>
    )
}