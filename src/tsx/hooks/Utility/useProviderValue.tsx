import React, { useMemo, useRef } from "react";

//convert list [state, setState] to object {state, setState}
//object result can be spread

export default function useProviderValue([state, setState]: [any, Function]) {
    const providerValue = useMemo(() => {
        return {state, setState};
    }, [state, setState]);

    return providerValue;
}