import React, { useEffect, useState } from "react";
import DOMManagement from "src/ts/helpers/DOMManagement";
import useComputedUnit, { UnitDimension } from "./useComputedUnit";
import useComputedUnitRatio from "./useComputedUnitRatio";

export default function useComputedAreaRatio(
	context: HTMLElement, //ref context
	antecedant: string | number | undefined, // left of ratio
	[widthConsequent, heightConsequent]: [string | number | undefined, string | number | undefined],
	[widthCScale, heightCScale]: [string | number | undefined, string | number | undefined],
	widthDependance: number = 1,
	heightDependance: number = 0
): number {
	// width <-> height
	const dimensionDependance =
		widthDependance / (widthDependance + heightDependance);

	const pxAntecedant = useComputedUnit(
		context,
		DOMManagement.streamlineUnits(antecedant),
		widthDependance > heightDependance
			? UnitDimension.Width
			: UnitDimension.Height
	);

	const widthRatio = useComputedUnitRatio(
		context,
		antecedant,
		`calc(${widthConsequent} * ${heightConsequent})`,
		`calc(${widthCScale} * ${heightCScale})`,
		UnitDimension.Width
	);
	const heightRatio = useComputedUnitRatio(
		context,
		antecedant,
		`calc(${widthConsequent} * ${heightConsequent})`,
		`calc(${widthCScale} * ${heightCScale})`,
		UnitDimension.Height
	);

	const [ratio, setRatio] = useState<number | undefined>(pxAntecedant);
    useEffect(() => setRatio(widthRatio + ((heightRatio - widthRatio) * dimensionDependance)), [widthRatio, heightRatio]);

    return ratio ?? pxAntecedant;
}
