import React, { ForwardedRef, forwardRef, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { PageCollection, PageLayout, PageOffset } from "src/ts/models/BookSource";
import handleRef from "src/tsx/hooks/handleRef";
import useForceUpdate from "src/tsx/hooks/useForceUpdate";
import { BookPlayerContext } from "./BookPlayer";

import "./point-counter.scss";

const PointCounter = forwardRef(({
	style
}: {
	style?: React.CSSProperties
}, ref?: ForwardedRef<HTMLDivElement>) => {
	const context = useContext(BookPlayerContext);

	const validateNaN = (valid: number, invalid: number = 1) => {
		if (!isNaN(valid)) return valid;
		else return invalid;
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
		>
			<div className="head">
				<span>
					{context.progress.source.pageLayout == PageLayout.Single ? (
						<>
							<input 
								className="page" 
								type="number"
								value={validateNaN(context.input.currentPages[0], 1)}
								// min={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).min}
								// max={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).max}
								onInput={e => context.input.setCurrentPages([parseInt((e.target as HTMLInputElement).value)])}
								onKeyUp={e => {
									if (e.key === "Enter") context.setProgress(progress => {
										progress.setCurrentPage(parseInt((e.target as HTMLInputElement).value));
										return progress;
									})
								}}
								onBlur={e => context.setProgress(progress => {
									progress.setCurrentPage(parseInt(e.target.value));
									return progress;
								})}
							/>
						</>
					) : (
						<>
							<input 
								className="page" 
								type="number"
								value={validateNaN(context.input.currentPages[0], 1)}
								min={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).min}
								max={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).max}
								onInput={e => context.input.setCurrentPages(currentPages => [parseInt((e.target as HTMLInputElement).value), currentPages[1]])}
								onKeyUp={e => {
									if (e.key === "Enter") context.setProgress(progress => {
										progress.setCurrentPage(parseInt((e.target as HTMLInputElement).value));
										return progress;
									})
								}}
								onBlur={e => context.setProgress(progress => {
									progress.setCurrentPage(parseInt(e.target.value));
									return progress;
								})}
							/>
							<span className="dash static"><span/></span>
							<input 
								className="page" 
								type="number"
								value={validateNaN(context.input.currentPages[1], 1)}
								min={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).min}
								max={context.progress.source.getPageRange(PageCollection.Full, PageOffset.Offset).max}
								onInput={e => context.input.setCurrentPages(currentPages => [currentPages[0], parseInt((e.target as HTMLInputElement).value)])}
								onKeyUp={e => {
									if (e.key === "Enter") context.setProgress(progress => {
										progress.setCurrentPage(parseInt((e.target as HTMLInputElement).value));
										return progress;
									})
								}}
								onBlur={e => context.setProgress(progress => {
									progress.setCurrentPage(parseInt(e.target.value));
									return progress;
								})}
							/>
						</>
					)}
					<span className="divide static"><span/></span>
					<span className="max">{context.progress.source.getPageRange(PageCollection.Source, PageOffset.Offset).max}</span>
				</span>
			</div>
		</div>
	);
})

export default PointCounter;