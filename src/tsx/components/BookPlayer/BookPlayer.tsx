import React, { createContext, ForwardedRef, forwardRef, useContext, useLayoutEffect, useRef } from "react";
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

// export const BookPlayerContext = createContext<{
// 	book: Book;
// 	progress: BookProgress;
// }>({
// 	book: new Book(),
// 	progress: new BookProgress(),
// });
export const BookPlayerContext = createContext<any>(undefined);

//export default function BookPlayer({}) {
const BookPlayer = ({
	progress, setProgress
}: {
	progress: BookProgress, setProgress: Function
}, ref: ForwardedRef<HTMLDivElement>) => {
	const {book, author, reader, editor, source} = progress;

	return (
		<BookPlayerContext.Provider value={{
            book,
            progress, setProgress,
        }}>
			<div ref={ref} className="book-player">
				<div className="page" draggable="false">
					<img
						draggable="false"
						src={require("src/assets/books/The Cat in the Hat/THE-CAT-IN-THE-HAT-03.png")}
						alt="Book page"
					/>
					
				</div>
				
				<div className="page-turn next">
					<div className="background"></div>
					
					<div className="zone"></div>
					
					<div className="active"></div>
					<img className="arrow" src={_arrowRightPATH} alt="" />
				</div>
				
				<div className="page-turn last">
					<div className="background"></div>

					<div className="zone"></div>

					<div className="active"></div>
					<img className="arrow" src={_arrowLeftPATH} alt="" />
				</div>

				<Progress />
			</div>
		</BookPlayerContext.Provider>
	);
}

export default forwardRef(BookPlayer);