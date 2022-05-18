import React, { useEffect } from "react";

export default function Global() {
    useEffect(() => {
        document.documentElement.style.setProperty("--viewport-height-fill", window.innerHeight + "px");
    }, [])
    useEffect(() => {

    })

	return <div>global</div>;
}
