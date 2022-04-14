import React, { createContext, CSSProperties, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import "./book-viewer.scss";

import "./author-info.scss";
import "./reader-info.scss";
import "./editor-info.scss";

import "./Plain";

import BookPlayer from "src/tsx/components/BookPlayer";
import Navbar from "src/tsx/layout/Navbar";
import Footer from 'src/tsx/layout/Footer';
import ZoomToolbar from 'src/tsx/layout/ZoomToolbar';
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";
import RectLink from "src/tsx/components/RectLink";
import FixedScreen from 'src/tsx/layout/FixedScreen';
import ScrollContainer from "src/tsx/containers/ScrollContainer";
import ArticleContent from "src/tsx/layout/ArticleContent";
import Book from "src/ts/models/BookOutlines/Book";
import Reader from "src/ts/models/BookOutlines/Reader";
import EditorBFL from "src/ts/models/BookOutlines/EditorBFL";
import BookProgress from "src/ts/models/BookProgress";
import Author from "src/ts/models/BookOutlines/Author";
import useWindowResize from "src/tsx/hooks/useWindowResize";
import BookInfo from "./BookInfo";
import AuthorInfo from "./AuthorInfo";
import ReaderInfo from "./ReaderInfo";
import EditorInfo from "./EditorInfo";
import BookOutline from "src/ts/models/BookOutline";
import PDFViewer from "src/tsx/components/PDFViewer/PDFViewer";

// export const BookViewerContext = createContext<{
//     book: Book,
//     author: Author,
//     reader?: Reader,
//     editor?: EditorBFL,
//     progress: BookProgress
// }>({
//     book: new Book(),
//     author: new Author(),
//     progress: new BookProgress()
// });
export const BookViewerContext = createContext<any>(undefined);

export default function BookViewer() {
    const [progress, setProgress] = useState<BookProgress>(new BookProgress());
	// useEffect(() => {
	// 	setProgress((progress: BookProgress) => {
	// 		progress = new BookProgress();
	// 		progress.outline = new BookOutline();
	// 		progress.outline.book = new Book();
	// 		progress.outline.book.author = new Author();
	// 		progress.outline.reader = new Reader();
	// 		progress.outline.editor = new EditorBFL();
	
	// 		return progress;
	// 	});
	// }, []);

    // const book = useMemo<Book>(() => progress.book, [progress.outline, progress]);
    // const author = useMemo<Author>(() => progress.author, [progress.outline, progress]);
    // const reader = useMemo<Reader>(() => progress.reader, [progress.outline, progress]);
    // const editor = useMemo<EditorBFL>(() => progress.editor, [progress.outline, progress]);

    const [bookZoom, setBookZoom] = useState<number>(1);

    const [windowWidth, windowHeight] = useWindowResize();

    const bookPlayerRef = useRef<HTMLDivElement>(null!);

    useLayoutEffect(() => {
        if (bookZoom > 1) setBookZoom(1);
        if (bookZoom < 0) setBookZoom(0);

        let computedStyle = window.getComputedStyle(bookPlayerRef.current);
        let minWidth = computedStyle.getPropertyValue("min-width");
        let maxWidth = computedStyle.getPropertyValue("max-width");
        let minHeight = computedStyle.getPropertyValue("min-height");
        let maxHeight = computedStyle.getPropertyValue("max-height");

        if (maxWidth != "none") {
            bookPlayerRef.current.style.height = "auto";
            bookPlayerRef.current.style.width = `calc(${minWidth} + ((${maxWidth} - ${minWidth}) * ${bookZoom}))`;
        }
        if (maxHeight != "none") {
            bookPlayerRef.current.style.width = "auto";
            bookPlayerRef.current.style.height = `calc(${minHeight} + ((${maxHeight} - ${minHeight}) * ${bookZoom}))`;
        }
	}, [bookZoom, windowWidth, windowHeight]);

    return (
			<BookViewerContext.Provider
				value={{
					// book,
					// author,
					// reader,
					// editor,

					progress,
					setProgress,

					bookZoom,
					setBookZoom,
				}}
			>
				<Navbar
					entries={[
						{
							name: "Read",
							href: "https://blackstonefoundationlibrary.overdrive.com/",
						},
						{ name: "Purchase", href: "https://www.knowledgebookstore.com/" },
						{ name: "About Us", href: "http://thebfl.org/" },
						{ name: "Contact", href: "http://thebfl.org/" },
					]}
				/>
				<ScrollContainer
					className="book-container"
					style={{ zIndex: 10 }}
					reserveTop={"0.75rem"}
					reserveBottom={"0.75rem"}
				>
					<BookPlayer
						// book={book}
						progress={progress}
						setProgress={setProgress}
						ref={bookPlayerRef}
					/>
				</ScrollContainer>
				<div className="total-book-info">
					<ZoomToolbar bookZoom={bookZoom} setBookZoom={setBookZoom} />
					{/* <BookInfo outline={progress.outline} />
					<AuthorInfo outline={progress.outline} />
					<ReaderInfo outline={progress.outline} />
					<EditorInfo outline={progress.outline} /> */}
				</div>
				<ArticleContent>
					{/* <iframe src={`${"/vendors/pdfjs-dist/web/viewer.html"}?file=${require("src/assets/books/The Cat in the Hat.pdf")}`} style={{
						width:"100%",
						height: "20cm",
						border: "none"
						}}/> */}
					<PDFViewer src={require("src/assets/books/The Cat in the Hat.pdf")} currentPage={[1, 1]} doubleSided={true} width={"400px"}/>
					{/* <PDFViewer src={require("src/assets/books/The Cat in the Hat.pdf")} currentPage={1} doubleSided={false}/> */}

					<h1>Read More</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="Borrow"
							subtitle="Digital Library"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/books_1f4da.png"
							background="var(--col-purple)"
							href="https://blackstonefoundationlibrary.overdrive.com/"
							className="-theme-dark"
						>
							BFL Digital Library powered by OverDrive.
						</RectLink>
						<RectLink
							title="Purchase"
							subtitle="Knowledge Bookstore"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/notebook-with-decorative-cover_1f4d4.png"
							background="var(--col-mud)"
							href="https://www.knowledgebookstore.com/"
							className="-theme-dark"
						>
							Purchase empowering books online.
						</RectLink>
					</div>

					<h1>Learn</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="Peer Mentor Program"
							subtitle="Do The Knowledge Online"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/handshake_medium-dark-skin-tone_1f91d-1f3fe_1f3fe.png"
							background="#882988"
							href="https://thebfl.org/"
							className="-theme-dark"
						>
							Our Peer Mentor-driven program offering safe spaces that encourage
							self-awareness, self-expression and self-knowledge.
						</RectLink>

						<RectLink
							title="Workshop Series"
							subtitle="Seeds of Wisdom"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/woman-teacher-medium-dark-skin-tone_1f469-1f3fe-200d-1f3eb.png"
							background="#12804e"
							href="https://thebfl.org/"
							className="-theme-dark"
						>
							Our Afrocentric Literacy, Culture and Wellness workshop series for
							children ages 6 to 12 years.
						</RectLink>
					</div>

					<h1>Stay Updated</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="Blog"
							subtitle="Knowledge Videos and Articles"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/speech-balloon_1f4ac.png"
							background="#68376d"
							href="https://www.knowledgebookstore.com/blogs/knowledge-videos"
							className="-theme-dark"
						>
							Stay updated with our blog.
						</RectLink>

						<RectLink
							title="Events"
							subtitle="Keep Informed"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/tear-off-calendar_1f4c6.png"
							background="#962a39"
							href="https://www.knowledgebookstore.com/pages/events"
							className="-theme-dark"
						>
							Find out what's going on at Knowledge Bookstore and in our
							community. Knowledge Bookstore event listing has special events,
							authors signing, promotion and more.
						</RectLink>

						<RectLink
							title="Mailing List"
							subtitle="Join our Mailing List"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/memo_1f4dd.png"
							background="#ad703e"
							href="https://thebfl.org/"
							className="-theme-dark"
						>
							Stay updated with our mailing list.
						</RectLink>

						<RectLink
							title="Newsletter"
							subtitle="Newsletter Signup"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/newspaper_1f4f0.png"
							background="#37579b"
							href="https://www.knowledgebookstore.com/pages/newsletter-signup"
							className="-theme-dark"
						>
							Signup for our newsletter.
						</RectLink>
					</div>

					<h1>Support</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="PayPal"
							subtitle="Donate"
							icon="https://www.ecigclick.co.uk/wp-content/uploads/2020/11/paypal-bans-vaping.png"
							background="#1a5daa"
							href="https://thebfl.org/thebrotherhood/"
							className="-theme-dark"
						>
							Donate to The Black Stone Foundation Library through VISA,
							MasterCard, American Express, Discover or PayPal.
						</RectLink>

						<RectLink
							title="Email Transfer"
							subtitle="Support with Email Transfer"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/envelope_2709-fe0f.png"
							background="#d88334"
							href="https://thebfl.org/thebrotherhood/"
							className="-theme-dark"
						>
							We accept email transfers at
							blackstonefoundationlibrary@gmail.com.
						</RectLink>

						<RectLink
							title="The Brotherhood"
							subtitle="Partners for a Good Cause"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/raised-fist_dark-skin-tone_270a-1f3ff_1f3ff.png"
							background="#632a63"
							href="https://thebfl.org/thebrotherhood/"
							className="-theme-dark"
						>
							Empowering our incarcerated Black and Indigenous brothers and
							sisters in Ontario.
						</RectLink>
					</div>

					<h1>Get Involved</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="Book Drive"
							subtitle="Black Book Box"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/basket_1f9fa.png"
							background="#a3212c"
							href="https://thebfl.org/"
							className="-theme-dark"
						>
							Our Community Book Drive, encouraging all to donate pre-loved
							books to our catalogue.
						</RectLink>

						<RectLink
							title="Volunteer"
							subtitle="Volunteer Applications"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/hand-with-fingers-splayed_dark-skin-tone_1f590-1f3ff_1f3ff.png"
							background="#5a1a96"
							href="https://docs.google.com/forms/d/e/1FAIpQLSfgk65YBlBnRviIffpBhI8IXEpOzL9A5w4KqutqXcTxaP1-BQ/viewform"
							className="-theme-dark"
						>
							Volunteers play a very integral part in how we enable safe spaces
							for knowledge-seekers. Sign up today!
						</RectLink>

						<RectLink
							title="Hiring"
							subtitle="Work with Us"
							icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/clipboard_1f4cb.png"
							background="#693d18"
							href="https://thebfl.org/"
							className="-theme-dark"
						>
							Work at a position in The Black Stone Foundation Library.
						</RectLink>
					</div>
					{/* <br/>
                    <p style={{textAlign: "center", padding: "auto 1rem"}}><a href="https://www.knowledgebookstore.com/" style={{color: "black"}} target="_blank" rel="noopener noreferrer">Looking for other books?</a></p>
                    <br/> */}
				</ArticleContent>
				<Footer />
				<FixedScreen>
					<p
						style={{
							fontFamily: "Arial",
							fontSize: "0.8rem",
							fontWeight: "bold",
							background: "white",
							margin: "0.5rem",
							padding: "0.2rem",
							position: "absolute",
							right: 0,
							bottom: "1.5rem",
							opacity: 0.5,
							zIndex: 16,
						}}
						className="responsive-test"
					></p>
					<p
						style={{
							fontFamily: "Arial",
							fontSize: "0.8rem",
							fontWeight: "bold",
							background: "white",
							margin: "0.5rem",
							padding: "0.2rem",
							position: "absolute",
							right: 0,
							bottom: "0.0rem",
							opacity: 0.5,
							zIndex: 16,
						}}
						className="responsive-test-below"
					></p>
				</FixedScreen>
			</BookViewerContext.Provider>
		);
}
