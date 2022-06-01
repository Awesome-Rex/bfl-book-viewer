import React, { ForwardedRef, forwardRef, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PageCollection, PageLayout, PageOffset } from "src/ts/models/BookSource";
import handleRef from "src/tsx/hooks/Basic/handleRef";
import { BookPlayerContext } from "./BookPlayer";
import PageEntry from "./PageEntry";

import "./point-counter.scss";

const PointCounter = forwardRef(({
	style
}: {
	style?: React.CSSProperties
}, ref?: ForwardedRef<HTMLDivElement>) => {
	// context
	const context = useContext(BookPlayerContext);

	// refs

	// state

	// functions
	const validateNaN = (valid: number, invalid: number = 1) => {
		if (!isNaN(valid)) return valid;
		else return invalid;
	}

	// const validateNumber = (valid: string, invalid: number = 1) => {
	// 	if (!isNaN(valid)) return parseInt(valid);
	// 	else return invalid;
	// }

	const enterPage = (page: number) => {
		context.setProgress(progress => {
			progress.setCurrentPage(page);
			return progress;
		});
	}

	return (
		<div 
			className="point-counter -theme-dark"
			// @ts-ignore
			//style={{...style, "--comp-width": `${pointCounterRef.current?.offsetWidth}px`}}
			style={style}
			ref={handleRef([context.pointCounterRef], ref)}

			onFocus={() => context.switchProgressNear.lockOn()}
			onBlur={() => context.switchProgressNear.unlock()}

			onPointerOver={() => context.interact.setWidgetHover(prev => prev || true)}
			onPointerOut={() => context.interact.setWidgetHover(prev => prev || false)}
		>
			<div className="head">
				<span>
					{context.progress.source.pageLayout == PageLayout.Single ? (
						<>
							<PageEntry index={0}/>
						</>
					) : (
						<>
							<PageEntry index={0}/>
							<span className={`dash static entry ${!context.progress.source.pageIncluded(context.input.currentPages[0], PageCollection.Defined) && "-excluded"}`}><span/></span>
							<PageEntry index={1}/>
						</>
					)}
					<span className="divide static"><span/></span>
					<span className="max">{context.progress.source.getPageRange(PageCollection.Defined, PageOffset.Offset).max}</span>
				</span>
			</div>
		</div>
	);
})

export default PointCounter;