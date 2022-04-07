import React from "react";
import "./fixed-screen.scss";

export default function FixedScreen({ children }: {children:any}) {
    return (
        <div id="fixed-screen">
            {children}
        </div>
    );
}
