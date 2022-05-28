import React, { useEffect } from "react";

// alternative to usEffect
// allows callback to have escape return statements (prevents need for if statements)
export default function useEffectEscapable(update: () => void, unmount?: () => void, deps?: React.DependencyList | undefined) {
    useEffect(() => {
        update();

        return unmount;
    }, deps);
}
