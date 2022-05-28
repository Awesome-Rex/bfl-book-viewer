import React, { ReactComponentElement, useCallback, useEffect, useMemo, useRef, useState } from "react";
import "./book-player-info.scss";

import Heading from "src/tsx/helpers/Heading";
import PageBanner from "src/tsx/layout/PageBanner";
import useRefResizeObserver from "src/tsx/hooks/useRefResizeObserver";
import useRefEventListener from "src/tsx/hooks/useRefEventListener";
import useWindowResize from "src/tsx/hooks/useWindowResize";
import EventManagement from "src/ts/helpers/EventManagement";
import DOMManagement from "src/ts/helpers/DOMManagement";

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

    //state
    const [windowWidth, windowHeight] = useWindowResize(() => {});
    const [overflow, setOverflow] = useState<boolean>(false);
	useEffect(() => {
		setOverflow(DOMManagement.overflowY(descriptionRef.current));
	}, [description, windowWidth, windowHeight]);
	const [expanded, setExpanded] = useState<boolean>(false);

	//events
	useRefEventListener(drawerRef.current, "click", () => {
		setExpanded(prev => !prev);
	});

	return (
		<PageBanner 
            banner={{ 
                className: `book-player-info ${className ?? ""} ${overflow ? "-overflow" : ""} ${expanded ? "-expand" : ""}`,
                // @ts-ignore
                style: {"--min-info-desc": `${descriptionRef.current?.scrollHeight}px`}
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
				<div className="description" ref={descriptionRef}>{description}</div>
				<div className="drawer" ref={drawerRef}>
					<span className="text"></span>
				</div>
			</div>
		</PageBanner>
	);
}
