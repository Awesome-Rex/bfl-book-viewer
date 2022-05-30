import React, { ReactComponentElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./book-player-info.scss";

import Heading from "src/tsx/helpers/Heading";
import PageBanner from "src/tsx/layout/PageBanner";
import useWindowResize from "src/tsx/hooks/DOM/useWindowResize";
import EventManagement from "src/ts/helpers/EventManagement";
import DOMManagement from "src/ts/helpers/DOMManagement";
import useComputedUnit, { UnitDimension } from "src/tsx/hooks/ComputedStyle/useComputedUnit";
import useGetComputedStyle from "src/tsx/hooks/ComputedStyle/useGetComputedStyle";

export default function BookPlayerInfo({
	title = "",
	level = 1,
	image = "",
	alt = "",
	tags = [],
	children: description = <></>,
	className,
}: {
	title: string;
	level?: number;
	image?: string;
	alt?: string;
	tags?: string[];
	children?: React.ReactNode;
	className?: string;
}) {
    //refs
    const bookPlayerInfoRef = useRef<HTMLDivElement>(null!);
    const infoRef = useRef<HTMLDivElement>(null!);
    const drawerRef = useRef<HTMLDivElement>(null!);
    const descriptionRef = useRef<HTMLDivElement>(null!);

	//style
	const pxMinDescriptionHeight = useComputedUnit(descriptionRef.current, useGetComputedStyle(descriptionRef.current, "--max-info-desc"), UnitDimension.Height);
	
    //state
    const [windowWidth, windowHeight] = useWindowResize();
    const [overflow, setOverflow] = useState<boolean>(false);
	useEffect(() => {
		setOverflow(descriptionRef.current.scrollHeight > pxMinDescriptionHeight);
	}, [description, windowWidth, windowHeight, pxMinDescriptionHeight, descriptionRef.current, descriptionRef.current?.scrollHeight]);
	const [expanded, setExpanded] = useState<boolean>(false);

	return (
		<PageBanner 
            banner={{ 
                className: `book-player-info ${className ?? ""} ${overflow ? "-overflow" : ""} ${expanded ? "-expand" : ""}`
			}} 
            ref={bookPlayerInfoRef}
        >
			<div className="image -live-area">
				<img className="-live-area" src={image} alt={alt} />
			</div>

			<div className="info" ref={infoRef}>
				<Heading level={level} className="title">
					{title}
				</Heading>

				<hr />
				<div className="tags">
					{tags.map((tag, i, arr) => (
						<span key={i}>{tag}</span>
					))}
				</div>
				<div 
					className="description" 
					ref={descriptionRef}
					style={{
						height: !overflow ? `auto` : !expanded ? pxMinDescriptionHeight : descriptionRef.current.scrollHeight,
						overflowY: "hidden"
					}}
				>
					{description}
				</div>
				{overflow && <div 
					className="drawer" 
					ref={drawerRef}
					onClick={e => setExpanded(expanded => !expanded)}
				>
					<span className="text">{!expanded ? "EXPAND" : "COLLAPSE"}</span>
				</div>}
			</div>
		</PageBanner>
	);
}
