import React, { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useCustomEffect(effect: EffectCallback, deps?: DependencyList | undefined, filters?: (((a: unknown, b: unknown) => boolean) | undefined)[]) {
	const previousDeps = useRef<DependencyList | undefined>(undefined);
    const currentDeps = useRef<DependencyList | undefined>(deps);

    useEffect(effect, []);

    if (deps) { // defined dependencies
        currentDeps.current = deps;
        let diff = false;
        currentDeps.current.forEach((currentDep, i, currentDeps) => {
            if (previousDeps.current != undefined) {
                const previousDep: unknown = previousDeps.current[i];
                if (filters != undefined) {
                    const filter = filters[i];
                    if (i < filters.length && filter != undefined) { // filter available and in range
                        if (!filter(currentDep, previousDep)) {
                            diff = true;
                        }
                    } else { // unefined individual filter / filter out of range
                        if (currentDep != previousDep) {
                            diff = true;
                        }
                    }
                } else { // undefined filter list
                    if (currentDep != previousDep) {
                        diff = true;
                    }
                }
            }
        });
        if (diff) {
            previousDeps.current = currentDeps.current;
            
            effect();
        }
    } else { // undefined dependencies
        effect();
    }
}
