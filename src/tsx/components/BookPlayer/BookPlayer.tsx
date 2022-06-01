import React, { createContext, ForwardedRef, forwardRef, MutableRefObject, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./book-player.scss";

// https://jakearchibald.github.io/svgomg/
import _arrowLeftPATH from "src/assets/images/ArrowLeft.svg";
import _arrowRightPATH from "src/assets/images/ArrowRight.svg";

import Progress from "./Progress";
import Book from "src/ts/models/BookOutlines/Book";
import BookProgress from "src/ts/models/BookProgress";
import { BookViewerContext } from "src/tsx/pages/BookViewer/BookViewer";
import useWindowResize from "src/tsx/hooks/DOM/useWindowResize";
import PDFViewer from "../PDFViewer/PDFViewer";
import { PageCollection, PageLayout, PageOffset } from "src/ts/models/BookSource";
import DOMManagement from "src/ts/helpers/DOMManagement";
import EventManagement from "src/ts/helpers/EventManagement";
import { PageRange } from "src/ts/models/PageRange";
import useRefEventListener from "src/tsx/hooks/EventListener/useRefEventListener";
import useSwitchCallback, { SwitchRef } from "src/tsx/hooks/Utility/useSwitchCallback";
import PageTurn from "./PageTurn";

export const BookPlayerContext = createContext<{
	sliderRef: MutableRefObject<HTMLInputElement>,
	progressZoneRef: MutableRefObject<HTMLDivElement>,
	pointCounterRef: MutableRefObject<HTMLDivElement>,

	progress: BookProgress, setProgress: React.Dispatch<React.SetStateAction<BookProgress>>,
	

	progressNear: boolean, setProgressNear: React.Dispatch<React.SetStateAction<boolean>>, switchProgressNear: SwitchRef,
	progressHover: boolean, setProgressHover: React.Dispatch<React.SetStateAction<boolean>>,
	progressActive: boolean, setProgressActive: React.Dispatch<React.SetStateAction<boolean>>

	input: {
		currentView: number, setCurrentView: React.Dispatch<React.SetStateAction<number>>,
		entryCurrentView: number, setEntryCurrentView: React.Dispatch<React.SetStateAction<number>>,
		currentPages: number[], setCurrentPages: React.Dispatch<React.SetStateAction<number[]>>,
		entryCurrentPages: number[], setEntryCurrentPages: React.Dispatch<React.SetStateAction<number[]>>
	},

	interact: {
		previewHover: boolean, // </React.SetStateAction>setPreviewHover: React.Dispatch<React.SetStateAction<boolean>>,
		widgetHover: boolean, setWidgetHover: React.Dispatch<React.SetStateAction<boolean>>,
		pageTurnHover: boolean, setPageTurnHover: React.Dispatch<React.SetStateAction<boolean>>
	}
}>(undefined!);

//export default function BookPlayer({}) {
const BookPlayer = ({
	progress, 
	setProgress,
	firstFiller,
	lastFiller
}: {
	progress: BookProgress, 
	setProgress: React.Dispatch<React.SetStateAction<BookProgress>>,
	firstFiller?: React.ReactNode,
	lastFiller?: React.ReactNode,
}, ref: ForwardedRef<HTMLDivElement>) => {
	// PROPS
	const {book, author, reader, editor, source} = progress;

	// REFS
	const previewRef = useRef<HTMLDivElement>(null!);
	const viewerRef = useRef<HTMLDivElement>(null!);
	const sliderRef = useRef<HTMLInputElement>(null!);
    const progressZoneRef = useRef<HTMLDivElement>(null!);
    const pointCounterRef = useRef<HTMLDivElement>(null!);

	// STATE
	const [previewHover, setPreviewHover] = useState<boolean>(false);
	const [widgetHover, setWidgetHover] = useState<boolean>(false);

	// INPUT
	const [entryCurrentView, setEntryCurrentView] = useState<number>(progress.currentView);
	useEffect(() => {
        setCurrentView(progress.currentView);
    }, [progress.currentView]);
	const [currentView, setCurrentView] = useMemo(() => [
		Math.round(entryCurrentView),
		setEntryCurrentView
	], [entryCurrentView]);

	const [currentPages, setCurrentPages] = useState<number[]>(progress.currentPages);
	useEffect(() => {
		setCurrentPages(progress.source.viewToPages(Math.round(currentView), PageCollection.Full, PageOffset.Offset));
	}, [currentView]);
	useEffect(() => {
		setCurrentPages(progress.currentPages);
	}, [progress.currentView]);

	const [entryCurrentPages, setEntryCurrentPages] = useState<number[]>([0]);
	useEffect(() => {
		// entryStringCurrentPages(context.progress.currentPages.map(page => page.toString()))
		setEntryCurrentPages(progress.currentPages);
	}, [progress.source]);
	useEffect(() => {
		// entryStringCurrentPages(context.progress.source.viewToPages(Math.round(context.input.currentView)).map(page => page.toString()));
		setEntryCurrentPages(progress.source.viewToPages(Math.round(currentView)));
	}, [currentView]);

	const [pageTurnHover, setPageTurnHover] = useState<boolean>(false);

	const [progressNear, setProgressNear] = useState<boolean>(false);
	const switchProgressNear = useSwitchCallback(() => {
		setProgressNear(true);
	}, () => {
		setProgressNear(false);
	}, false, false, 2000);
	const [progressHover, setProgressHover] = useState<boolean>(false);
    const [progressActive, setProgressActive] = useState<boolean>(false);

	// DATA
	const [totalPages, setTotalPages] = useState<number>(undefined!);
	
	return (
		<BookPlayerContext.Provider value={{
			sliderRef,
			progressZoneRef,
			pointCounterRef,

            progress, setProgress,

			progressNear, setProgressNear, switchProgressNear: switchProgressNear,
			progressHover, setProgressHover,
			progressActive, setProgressActive,

			input: {
				currentView, setCurrentView,
				entryCurrentView, setEntryCurrentView,
				currentPages, setCurrentPages,
				entryCurrentPages, setEntryCurrentPages
			},

			interact: {
				previewHover,
				widgetHover, setWidgetHover,
				pageTurnHover, setPageTurnHover
			}
        }}>
			<div 
				ref={ref} 
				className="book-player" 
				style={{
					cursor: !pageTurnHover ? "crosshair" : "pointer"
				}}
				onPointerOver={() => setPreviewHover(true)}
				onPointerOut={() => setPreviewHover(false)}
			>
				<div 
					ref={previewRef}
					className="preview" 
					draggable="false"
				>
					<PDFViewer 
						src={source.location} 
						doubleSided={source.pageLayout == PageLayout.Half} 
						halfFirst={source.halfFirst}
						halfLast={source.halfLast}
						currentPages={source.pageToRaw(progress.currentPage, PageCollection.Full, PageOffset.Offset)}
						setTotalPages={setTotalPages}
						ref={viewerRef}
						renderAnnotationLayer={false}
						firstFiller={firstFiller}
						lastFiller={lastFiller}
						renderTextLayer={true}
						textLayerStyle={{
							cursor: "text",
							color: "transparent",
							userSelect:"text"
						}}
						textLayerClassName={"text-layer"}
					/>
				</div>
				<PageTurn className="next" modify={1} arrowImage={_arrowRightPATH}/>
				<PageTurn className="prev" modify={-1} arrowImage={_arrowLeftPATH}/>
				<Progress />
			</div>
		</BookPlayerContext.Provider>
	);
}

export default forwardRef(BookPlayer);