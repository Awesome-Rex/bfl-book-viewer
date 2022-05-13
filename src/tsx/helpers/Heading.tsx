import React from 'react'

export default function Heading({level = 1, children = <></>, className}: {level: number, children: React.ReactNode, className: string}) {
    switch (level) {
        case 1:
            return <h1 className={className ?? ""}>{children}</h1>
        case 2:
            return <h2 className={className ?? ""}>{children}</h2>
        case 3:
            return <h3 className={className ?? ""}>{children}</h3>
        case 4:
            return <h4 className={className ?? ""}>{children}</h4>
        case 5:
            return <h5 className={className ?? ""}>{children}</h5>
        case 6:
            return <h6 className={className ?? ""}>{children}</h6>
        default:
            return <span>{'{ Invalid Heading Level }'}</span>
    }
}
