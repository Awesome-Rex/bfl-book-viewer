import React from 'react'
import "./wrap-container.scss";

export default function WrapContainer({className = "", style = {}, children = <></>}: {className?: string, style?: object, children?: React.ReactNode}) {
    return (
        <div className={`wrap-container ${className}`} style={{...style}}>
            {className}
        </div>
    );
}