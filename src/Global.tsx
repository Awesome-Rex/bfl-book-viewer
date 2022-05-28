import React, { useEffect } from "react";
import { useStyles } from "./scss/useStyles";
import useScripts from "./ts/useScripts";
import useTemplates from "./tsx/useTemplates";
import useVendors from "./vendors/useVendors";

import Vendors from "./vendors/useVendors";

export default function Global({children}: {children?: React.ReactNode}) {
    // mount
    useEffect(() => {

    }, []);
    
    // update
    useEffect(() => {

    })

    // effects
    useEffect(() => {

    }, []);

    // events
    

    // observers

    const vendors = useVendors();
    const styles = useStyles();
    const scripts = useScripts();
    const templates = useTemplates();

	return (
        <>
            {vendors}
            {styles}
            {scripts}
            {templates}
            {children}
        </>
    );
}
