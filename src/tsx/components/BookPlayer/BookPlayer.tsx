import React, { createContext, ForwardedRef, forwardRef, MutableRefObject, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import "./book-player.scss";

// https://jakearchibald.github.io/svgomg/
import _arrowLeftPATH from "src/assets/images/ArrowLeft.svg";
import _arrowRightPATH from "src/assets/images/ArrowRight.svg";

import Progress from "./Progress";
import Book from "src/ts/models/BookOutlines/Book";
import BookProgress from "src/ts/models/BookProgress";
import { BookViewerContext } from "src/tsx/pages/BookViewer/BookViewer";
import useWindowResize from "src/tsx/hooks/useWindowResize";
import PDFViewer from "../PDFViewer/PDFViewer";
import { PageCollection, PageLayout, PageOffset } from "src/ts/models/BookSource";
import useRefEventListener from "src/tsx/hooks/useRefEventListener";
import DOMManagement from "src/ts/helpers/DOMManagement";
import EventManagement from "src/ts/helpers/EventManagement";
import { PageRange } from "src/ts/models/PageRange";
import useSwitchCallback, { SwitchRef } from "src/tsx/hooks/useSwitchCallback";

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
		currentPages: number[], setCurrentPages: React.Dispatch<React.SetStateAction<number[]>>
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
	// useEffect(() => {
	// 	console.log(source)
		
	// 	console.log("%c view", "font-weight: bold; font-size: 1.5em;")
	// 	console.log(source.getViewRange())
	// 	console.log(source.getViewRange())
	// 	console.log(source.getTotalViews())
		
	// 	console.log("%c raw", "font-weight: bold; font-size: 1.5em;")
	// 	console.log(source.getPageRange(PageCollection.Raw, PageOffset.Offset))
	// 	console.log(source.getPageRange(PageCollection.Raw, PageOffset.Start))
	// 	console.log(source.getTotalPages(PageCollection.Raw))

	// 	console.log("%c full", "font-weight: bold; font-size: 1.5em;")
	// 	console.log(source.getPageRange(PageCollection.Full, PageOffset.Offset))
	// 	console.log(source.getPageRange(PageCollection.Full, PageOffset.Start))
	// 	console.log(source.getTotalPages(PageCollection.Full))
		
	// 	console.log("%c source", "font-weight: bold; font-size: 1.5em;")
	// 	console.log(source.getPageRange(PageCollection.Source, PageOffset.Offset))
	// 	console.log(source.getPageRange(PageCollection.Source, PageOffset.Start))
	// 	console.log(source.getTotalPages(PageCollection.Source))

	// 	console.log("%c defined", "font-weight: bold; font-size: 1.5em;")
	// 	console.log(source.getPageRange(PageCollection.Defined, PageOffset.Offset))
	// 	console.log(source.getPageRange(PageCollection.Defined, PageOffset.Start))
	// 	console.log(source.getTotalPages(PageCollection.Defined))
	// }, [])

	// REFS
	const viewerRef = useRef<HTMLDivElement>(null!);
	const pageTurnRef = {
		next: useRef<HTMLDivElement>(null!),
		prev: useRef<HTMLDivElement>(null!)
	};
	const pageZoneRef = {
		next: useRef<HTMLDivElement>(null!),
		prev: useRef<HTMLDivElement>(null!)
	};
	const sliderRef = useRef<HTMLInputElement>(null!);
    const progressZoneRef = useRef<HTMLDivElement>(null!);
    const pointCounterRef = useRef<HTMLDivElement>(null!);

	// STATE
	const [currentView, setCurrentView] = useState<number>(progress.currentView);
	useEffect(() => {
        setCurrentView(progress.currentView);
    }, [progress.currentView]);
	const [currentPages, setCurrentPages] = useState<number[]>(progress.currentPages);
	useEffect(() => {
		setCurrentPages(progress.currentPages);
	}, [progress.currentView]);

	const usePageTurnHover = () => {
		const [next, setNext] = useState<boolean>(false);
		const [prev, setPrev] = useState<boolean>(false);
		
		return {
			get next () { 
				return next
			},
			set next(state) {
				setNext(state);
			},
			get prev () { 
				return prev
			},
			set prev(state) {
				setPrev(state);
			}
		}
	};
	const pageTurnHover = usePageTurnHover();
	const switchPageTurnHover = {
		next: useSwitchCallback(() => {
			pageTurnHover.next = true;
		}, () => {
			pageTurnHover.next = false;
		}, false, false, 2000),
		prev: useSwitchCallback(() => {
			pageTurnHover.prev = true;
		}, () => {
			pageTurnHover.prev = false;
		}, false, false, 2000),
	};

	const usePageTurnActive = () => {
		const [next, setNext] = useState<boolean>(false);
		const [prev, setPrev] = useState<boolean>(false);
		
		return {
			get next () { 
				return next
			},
			set next(state) {
				setNext(state);
			},
			get prev () { 
				return prev
			},
			set prev(state) {
				setPrev(state);
			}
		}
	};
	const pageTurnActive = usePageTurnActive();
	const switchPageTurnActive = {
		next: useSwitchCallback(() => {
			pageTurnActive.next = true;
		}, () => {
			pageTurnActive.next = false;
		}, false, false),
		prev: useSwitchCallback(() => {
			pageTurnActive.prev = true;
		}, () => {
			pageTurnActive.prev = false;
		}, false, false)
	};

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

	// EVENTS
	useRefEventListener(document, "mousemove", e => { //page zone hover
		for (let [side, ref] of Object.entries(pageZoneRef)) {
			if (DOMManagement.mouseHover(ref.current, e)) {
				if (side == "next") switchPageTurnHover.next.burst(2000);
				if (side == "prev") switchPageTurnHover.prev.burst(2000);
			} else { // turn off hover when mouse leaves
				if (side == "next") switchPageTurnHover.next.off();
				if (side == "prev") switchPageTurnHover.prev.off();
			}
		}
	});

	useRefEventListener(document, "pointerdown", e => { // page zone active + press
		for (let [side, ref] of Object.entries(pageZoneRef)) {
			if (DOMManagement.mouseHover(ref.current, e)) {
				if (side == "next") switchPageTurnActive.next.lockOn();
				if (side == "prev") switchPageTurnActive.prev.lockOn();

				if (side == "next") switchPageTurnHover.next.lockOn();
				if (side == "prev") switchPageTurnHover.prev.lockOn();

				document.addEventListener("pointerup", e => {
					if (side == "next") switchPageTurnActive.next.lockOff();
					if (side == "prev") switchPageTurnActive.prev.lockOff();

					if (DOMManagement.mouseHover(ref.current, e)) {
						// action
						setProgress(progress => {
							if (side == "next") progress.currentView += 1;
							if (side == "prev") progress.currentView -= 1;

							return progress;
						});

						switchProgressNear.burst(2000);
						if (side == "next") {
							switchPageTurnHover.next.unlock();
							switchPageTurnHover.next.burst(2000, true);
						}
						if (side == "prev") {
							switchPageTurnHover.prev.unlock();
							switchPageTurnHover.prev.burst(2000, true);
						}
					}
				}, {once: true});
			}
		}
	});
	
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
				currentPages, setCurrentPages,
			}
        }}>
			<div ref={ref} className="book-player">
				<div className="page" draggable="false">
					<PDFViewer 
						src={source.location} 
						doubleSided={source.pageLayout == PageLayout.Half} 
						halfFirst={source.halfFirst}
						halfLast={source.halfLast}
						currentPages={source.pageToRaw(progress.currentPage, PageCollection.Full, PageOffset.Offset)}//{source.pageLayout == PageLayout.Half ? progress.currentPages : [progress.currentView]}
						setTotalPages={setTotalPages}
						ref={viewerRef}
						renderAnnotationLayer={false}
						firstFiller={firstFiller}
						lastFiller={lastFiller}
					/>
				</div>
				
				<div 
					className={`page-turn next ${pageTurnHover.next ? "-hover" : ""} ${pageTurnActive.next ? "-active" : ""}`} 
					style={{width: source.pageLayout != PageLayout.Single ? "50%" : "100%"}}
					ref={pageTurnRef.next}
				>
					<div className="background"></div>
					
					<div className="zone" ref={pageZoneRef.next}></div>
					
					<div className="active"></div>
					<img className="arrow" src={_arrowRightPATH} alt="" />
				</div>
				
				<div 
					className={`page-turn prev ${pageTurnHover.prev ? "-hover" : ""}  ${pageTurnActive.prev ? "-active" : ""}`}
					style={{width: source.pageLayout != PageLayout.Single ? "50%" : "100%"}}
					ref={pageTurnRef.prev}
				>
					<div className="background"></div>

					<div className="zone" ref={pageZoneRef.prev}></div>

					<div className="active"></div>
					<img className="arrow" src={_arrowLeftPATH} alt="" />
				</div>

				<Progress />
			</div>
		</BookPlayerContext.Provider>
	);
}

export default forwardRef(BookPlayer);