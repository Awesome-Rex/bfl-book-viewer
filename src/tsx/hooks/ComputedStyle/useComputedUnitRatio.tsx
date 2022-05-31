import React, { useEffect, useState } from "react";
import DOMManagement from "src/ts/helpers/DOMManagement";
import useComputedUnit, { UnitDimension } from "./useComputedUnit";

export default function useComputedUnitRatio(
    context: HTMLElement, //ref context
    antecedant: string | number | undefined, // left of ratio
    consequent: string | number | undefined, 
    cScale: string | number | undefined,
    dimension: UnitDimension = UnitDimension.Width
): number { // for font sizing with growing container
    const pxAntecedant = useComputedUnit(context, DOMManagement.streamlineUnits(antecedant), dimension);
    const pxConsequent = useComputedUnit(context, DOMManagement.streamlineUnits(consequent), dimension);
    const pxCScale = useComputedUnit(context, DOMManagement.streamlineUnits(cScale), dimension);

    const [pxAScale, setPxAScale] = useState<number | undefined>(pxAntecedant);
    useEffect(() => setPxAScale(pxAntecedant * (pxCScale / pxConsequent)), [pxAntecedant, pxConsequent, pxCScale]);
    
    return pxAScale != undefined && !isNaN(pxAScale) ? pxAScale : pxAntecedant;
}
