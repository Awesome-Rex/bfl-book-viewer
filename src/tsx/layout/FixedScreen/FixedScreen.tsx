import React from "react";
import "./fixed-screen.scss";

export default function FixedScreen({ 
    children 
}: {
    children?: React.ReactNode
}) {
    return (
        <div id="fixed-screen">
            {children}
        </div>
    );
}
