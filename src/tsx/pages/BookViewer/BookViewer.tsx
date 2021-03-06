import React, { createContext, CSSProperties, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import "./book-viewer.scss";
// import "./author-info.scss";
// import "./reader-info.scss";
// import "./editor-info.scss";

import _mouseCursorPATH from "src/assets/images/Mouse-Cursor.svg";

//import "./Plain";
//import "./PlainOld";

import BookPlayer from "src/tsx/components/BookPlayer";
import Navbar from "src/tsx/layout/Navbar";
import Footer from 'src/tsx/layout/Footer';
import ZoomToolbar from 'src/tsx/layout/ZoomToolbar';
import RectLink from "src/tsx/components/RectLink";
import FixedScreen from 'src/tsx/layout/FixedScreen';
import ScrollContainer from "src/tsx/containers/ScrollContainer";
import ArticleContent from "src/tsx/layout/ArticleContent";
import BookProgress from "src/ts/models/BookProgress";
import BookInfo from "./BookInfo";
import AuthorInfo from "./AuthorInfo";
import ReaderInfo from "./ReaderInfo";
import EditorInfo from "./EditorInfo";
import books from "./ResourceBooks";
import useWindowResize from "src/tsx/hooks/DOM/useWindowResize";
import useComputedUnitRatio from "src/tsx/hooks/ComputedStyle/useComputedUnitRatio";
import Filler from "./Filler";

export const BookViewerContext = createContext<{
	progress: BookProgress,
	setProgress: React.Dispatch<React.SetStateAction<BookProgress>>,

	bookZoom: number,
	setBookZoom: React.Dispatch<React.SetStateAction<number>>,
}>(undefined!);

export default function BookViewer() {
	// refs
	const bookPlayerRef = useRef<HTMLDivElement>(null!);

	// test refs
	const selection = useRef<BookProgress[]>([
		new BookProgress(books["The Cat in the Hat"]),
		new BookProgress(books["The Green Fern Zoo"]),
		new BookProgress(books["Abe the Service Dog"]),
	]);
	const [currentBook, setCurrentBook] = useState<number>(0);
	useEffect(() => {
		setProgress(selection.current[currentBook]);
	}, [currentBook]);

	// state
    const [progress, setProgress] = useState<BookProgress>(selection.current[currentBook]);
	const {book, author, reader, editor, source} = progress;
	useEffect(() => { // test effect
		selection.current[currentBook] = progress;
	}, [progress]);

    const [bookZoom, setBookZoom] = useState<number>(1);
	useLayoutEffect(() => {
		let computedStyle = window.getComputedStyle(bookPlayerRef.current);
        let minWidth = computedStyle.getPropertyValue("min-width");
        let maxWidth = computedStyle.getPropertyValue("max-width");
        let minHeight = computedStyle.getPropertyValue("min-height");
        let maxHeight = computedStyle.getPropertyValue("max-height");
		
		if (maxWidth != "none") {
            setBookZoom(((window.innerWidth * 0.9) - parseFloat(minWidth)) / (parseFloat(maxWidth) - parseFloat(minWidth)));
        }
        if (maxHeight != "none") {
            setBookZoom(((window.innerHeight * 0.9) - parseFloat(minHeight)) / (parseFloat(maxHeight) - parseFloat(minHeight)));
        }
	}, []);
    const [windowWidth, windowHeight] = useWindowResize();
    useLayoutEffect(() => { // change book player size to adapt to zoom level
        if (bookZoom > 1) setBookZoom(1);
        if (bookZoom < 0) setBookZoom(0);

		if (bookPlayerRef.current != undefined) {
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
		}
	}, [bookZoom, windowWidth, windowHeight]);

    return (
			<BookViewerContext.Provider
				value={{
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
						{ name: "About", href: "https://thebfl.org/about/" },
						{ name: "Contact", href: "https://thebfl.org/contact-us/" },
					]}
				/>
				<ScrollContainer
					className="book-container"
					style={{ zIndex: 10, justifyContent: !bookPlayerRef.current ? "space-between" : bookPlayerRef.current.offsetWidth < window.innerWidth ? "center" : "space-between"}}
					reserveTop={"0.75rem"}
					reserveBottom={"0.75rem"}
				>
					<BookPlayer
						// book={book}
						progress={progress}
						setProgress={setProgress}
						ref={bookPlayerRef}
						firstFiller={
							<Filler icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/sparkles_2728.png">
								<p>We believe that when a young mind comes across literature that inspires and encourages the journey of self-discovery, there is a spark ignited which when guided and nurtured, brings about a positive reform within Our Community.</p>
								<p><strong>We are committed to igniting that flame.</strong></p>
							</Filler>
						}
						lastFiller={
							<Filler icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/party-popper_1f389.png">
								<p><strong>You just finished reading <i>{book.title}</i> by {author?.name}.</strong></p>
								<p><strong>We hope you enjoyed the book!</strong></p>
								{/* <ul>
									<li>Looking for more books? <a href="#">Click here.</a></li>
									<li>Looking for more books? <a href="#">Click here.</a></li>
								</ul> */}
								{/* <br/> */}
								<hr/>
								{/* <br/> */}
								<p>The Blackstone Foundation Library is committed to ensuring access to culturally-relevant literature, mentorship opportunities and vital support systems as well as healthy engagement opportunities in safe, enabling spaces.</p>
								<p>Together, we are challenging the popular narratives and forging a desired Black future.</p>
								{/* <p style={{paddingLeft: "2rem"}}>We have come to the undeniable truth that knowledge is power. In the Black community, knowledge of self is the source of that power; THIS IS THE HEART BEHIND BLACKSTONE. - F.C</p> */}
							</Filler>
						}
					/>
				</ScrollContainer>
				<div className="total-book-info">
					<ZoomToolbar zoom={bookZoom} setZoom={setBookZoom} />
					<BookInfo outline={progress.outline}/>
					<AuthorInfo outline={progress.outline}/>
					<ReaderInfo outline={progress.outline}/>
					<EditorInfo outline={progress.outline}/>
				</div>
				<ArticleContent>
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
							href="https://thebfl.org/partnerships-1/"
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
							href="https://thebfl.org/partnerships-1/"
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
							href="https://thebfl.org/partnerships-1/"
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
							href="https://thebfl.org/#"//"https://docs.google.com/forms/d/e/1FAIpQLSfgk65YBlBnRviIffpBhI8IXEpOzL9A5w4KqutqXcTxaP1-BQ/viewform"
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
							href="https://www.linkedin.com/company/the-blackstone-foundation-library/?originalSubdomain=ca"
							className="-theme-dark"
						>
							Work at a position in The Black Stone Foundation Library.
						</RectLink>
					</div>

					<h1>Contact</h1>
					<hr />
					<div className="bottom-wrap">
						<RectLink
							title="Website"
							subtitle="thebfl.org/contact-us"
							icon={_mouseCursorPATH}
							background="#773e8a"
							href="https://thebfl.org/contact-us/"
							className="-theme-dark"
						>
							Contact us directly through our website.
						</RectLink>
						<RectLink
							title="Email"
							subtitle="blackstonefoundationlibrary@gmail.com" /* blackstonelibraryinfo@gmail.com *//* info@blackstonefoundationlibrary.org */
							icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Gmail_icon_%282020%29.svg/2560px-Gmail_icon_%282020%29.svg.png"}
							background="#1a56c5"//"#dfa1a1"//"#f3cd63"//"#ff9292" //#ccb6b6
							href="blackstonefoundationlibrary@gmail.com"
							className="-theme-dark"
						>
							Send us an email.
						</RectLink>
						<RectLink
							title="Instagram"
							subtitle="@blackstnlibrary"
							icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png"}
							background="#b1378a"//"#8f3370"
							href="https://www.instagram.com/blackstnlibrary/"
							className="-theme-dark"
						>
							View our Instagram.
						</RectLink>
						<RectLink
							title="Twitter"
							subtitle="@BlackStnLibrary"
							icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/2491px-Twitter-logo.svg.png"}
							background="#79b9d3"//"#7aaec2"
							href="https://twitter.com/BlackStnLibrary"
							className="-theme-dark"
						>
							See our tweets.
						</RectLink>
						<RectLink
							title="Facebook"
							subtitle="@BlackStnLibrary "
							icon={"https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/150px-Facebook_f_logo_%282021%29.svg.png"}
							background="#2b7bdd"//"#5a75aa"
							href="https://www.facebook.com/BlackStnLibrary/"
							className="-theme-dark"
						>
							View us on Facebook.
						</RectLink>
						<RectLink
							title="LinkedIn"
							subtitle="The Blackstone Foundation Library"
							icon={"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/768px-LinkedIn_logo_initials.png"}
							background="#3b82c9"//"#526dc5"
							href="https://www.linkedin.com/company/the-blackstone-foundation-library/?originalSubdomain=ca"
							className="-theme-dark"
						>
							Search on LinkedIn.
						</RectLink>
					</div>
					<br/>
					<p className="extra"><a href="https://blackstonefoundationlibrary.overdrive.com/">Looking for more books?</a></p>
					{/* <p style={{textAlign: "center", padding: "auto 1rem", textDecoration: "underline"}}>Thank you for reading!</p> */}
					{/* <br/> */}
				</ArticleContent>
				<Footer />
				<FixedScreen>
					<button 
						type="button"
						style={{
							position: "absolute",
							bottom: 0,
							left: 0,
							opacity: 0.5,
							width: "8em",
							height: "3em",
							pointerEvents: "all",
							fontWeight: "bold",
							textDecoration: "underline",
						}}
						onClick={() => {
							setCurrentBook(currentBook => {
								currentBook += 1
								if (currentBook >= selection.current.length) {
									currentBook = 0;
								}

								return currentBook;
							});
						}}
					>
						Switch Book
					</button>
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
