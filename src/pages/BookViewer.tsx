import React, {CSSProperties} from "react";

import "../scss/styles/pages/_home.scss";

import BookPlayer from "../components/BookPlayer";
import Navbar from "../components/Navbar";

import "./Plain";

import zoomInSVG from "../assets/images/PlusInvert.svg";
import zoomOutSVG from "../assets/images/MinusInvert.svg";

export default function BookViewer() {
  return (
    <>
        <Navbar/>
        <div className="book-container" style={{zIndex: 10}}> {/* scroll-container-x bit */}
            <BookPlayer/>
        </div>
        <div className="total-book-info">
            <div className="zoom-toolbar page-banner">
                <div>
                    <input type="button" className="zoom out" style={{backgroundImage: `url(${zoomOutSVG})`}}/>
                    <input type="range" className="slider" min="0" max="100"/>
                    <input type="button" className="zoom in" style={{backgroundImage: `url(${zoomInSVG})`}}/>
                </div>
            </div>
            <div className="book-player-info book page-banner -theme-dark">
                <div>
                    <div className="image -live-area">
                        <img className="-live-area" src="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png" alt="Book cover"/>
                    </div>

                    <div className="info">
                        <h1 className="title">The Cat in the Hat</h1>
                        <hr/>
                        <div className="tags">
                            <span className="author">Dr. Seuss</span>
                            {/*<hr/>*/}
                            <span className="date">March 12, 1957</span>
                            <span>61 Pages</span>
                        </div>
                        <div className="description">
                            {/* The Cat in the Hat is a tall anthropomorphic cat, who wears a red and white-striped hat and a red bow tie and sometimes has an umbrella with him mostly green, blue or red. He is a farm cat of Dr. Seuss's short story The Cat in the Hat. */}
                            
                            <h1>Summary</h1>
                            <strong>This classic Dr. Seuss story can open up discussions about trust, responsibility, social expectations, and honesty.</strong>
                            <p>Two children, Sally and Sam, are home alone and having a very dreary day. Suddenly, they’re graced with a surprise visit from a stranger, the Cat. He comes in, assures them their mom won’t mind his toys and tricks, and makes a very big mess. Before the Cat leaves, he cleans up his mess, and when Sam and Sally’s mother returns home, nothing is amiss. The story ends with the question, “What would YOU do if your mother asked YOU?”</p>
                            <hr/>
                            <h1>Guidelines for Philosophical Discussion</h1>
                            <p>The Cat in the Hat is a book where an eccentric stranger (who’s a cat!) visits two children, Sally and Sam, who are home alone and having a very dull day. Their mother is out, and when the Cat comes in, he reassures the kids that their mother won’t mind him or his tricks! This can offer an opportunity to talk about the first question set. You can discuss what trust is and who you can trust. It will be a concept that the kids will have been drilled about quite frequently, but hopefully, the book will offer them a new vantage point. They’ll be able to further develop why they have their opinions, not just what the right action is in a strange situation.</p>
                            <p>The story continues as the Cat falls while trying to balance too many things and drops everything that he was holding. As you talk with the kids about this section of the book, you can draw on the second question set. These questions ask who has responsibilities and why they might have them. Since children are often taught not to make a mess, it will offer them an opportunity to find their own reasons for why people keep telling them to be tidy, and what their responsibilities might be to themselves and others.</p>
                            <p>Another point of discussion that arises after the Cat drops what he was holding is what to do when someone does something wrong. The third question set deals with this. The Cat makes decisions that are very careless, presumably to amuse the children and himself. However, some of the things he does are dangerous and may not be acceptable for us to support. Should we laugh when people do wrong things to entertain us? Taking this approach can let the kids build off their previous experiences and help them decide how they want to act when approached with ‘wrong’ behavior.</p>
                            <p>The Cat, acknowledging that his poor balance thwarted his last attempt to entertain, tries another way to amuse the children. He brings in two friends, Thing One and Thing Two. These two Things make even more of a mess than the Cat did, and time is running out because the children spot their mother in the distance. This can bring up discussions about social expectations, which are in the fourth question set. You can discuss appropriate behavior, and how it might differ between your home and the home of a friend. Secondly, after seeing his mom, Sam decides that enough is enough. He decides to capture the Things. This introduces the kids to the concept of rudeness, and whether it’s okay or not to be rude to someone, a concept that stems from the book but relates directly to childrens’ lives.</p>
                            <p>As the mom comes in and Sally and Sam act as if nothing as happened, we are left to wonder the same question Dr. Seuss asks: would you tell your mom? This scenario offers the opportunity to discuss lying, the subject of the last question set. These questions seek to clear up some of the ambiguity surrounding lying. Can people be hurt by a lie even if they never find out that they’ve been told one? Since this draws on situations the kids might have encountered (deciding to lie or not), you’ll be able to draw concrete examples to keep them engaged. If they seem to be having difficulty engaging, you might want to create a scenario where someone has lied, and get the kids to discuss whether it was okay or not in the example (scenarios could include lying that you cheated on homework or lying to a friend). A note of warning: if you talk about real-life examples, the kids might try to bring up incidents that have happened in class. Lying is an important topic to introduce in a discussion, because most people are simply told not to lie, and not shown the damage of lying. When kids come to their own conclusions, they are much more likely to stick to them in times of distress.</p>
                            <hr/>
                            <h1>Questions for Philosophical Discussion</h1>
                            <h2>Trust</h2>
                            The Cat reassures the children that what he is doing is okay and that their mother won’t mind…
                            <ol>
                                <li>Would have you trusted the cat?</li>
                                <li>When can you trust strangers? What if they’re a teacher or a policeman?</li>
                                <li>How do you know that you can trust your friends?</li>
                                <li>What is trust?</li>
                            </ol>
                            <h2>Responsibility</h2>
                            The Cat, with all of his games, made quite a mess in Sally and Sam’s house…
                            <ol>
                                <li>Would have you trusted the cat?</li>
                                <li>When can you trust strangers? What if they’re a teacher or a policeman?</li>
                                <li>How do you know that you can trust your friends?</li>
                                <li>What is trust?</li>
                            </ol>
                        </div>
                        <div className="drawer"><span className="text"></span></div>
                    </div>
                </div>
            </div>
            <div className="book-player-info author page-banner">
                <div>
                    <div className="image">
                        <img src="https://cdn.vox-cdn.com/thumbor/iPafxYKSD_GagC6EiDyOff3NIB8=/0x0:3948x4018/1200x800/filters:focal(1371x986:2001x1616)/cdn.vox-cdn.com/uploads/chorus_image/image/68899768/1134107254.0.jpg" alt="Book author"/>
                    </div>

                    <div className="info">
                        <h2 className="title">Dr. Seuss</h2>
                        <hr/>
                        <div className="tags">
                            <span className="lifespan">March 2, 1904 - September 24, 1991</span>
                            <span>America</span>
                        </div>
                        <div className="description">
                            Dr. Seuss, pseudonym of Theodor Seuss Geisel, (born March 2, 1904, Springfield, Massachusetts, U.S.—died September 24, 1991, La Jolla, California), American writer and illustrator of immensely popular children’s books, which were noted for their nonsense words, playful rhymes, and unusual creatures.
                        </div>
                        <div className="drawer"><span className="text"></span></div>
                    </div>
                </div>
            </div>
            <div className="book-player-info reader page-banner">
                <div>
                    <div className="image">
                        <img src="https://yt3.ggpht.com/ytc/AKedOLRpXHWWHXHpv8drmCmEAkytrYl9nQ6-rFtoxSGM=s88-c-k-c0x00ffffff-no-rj" alt="Reader of this book"/>
                    </div>

                    <div className="info">
                        <h3 className="title">Story Time with Owl</h3>
                        <hr/>
                        <div className="tags">
                            <span className="date">February 25, 2022</span>
                            <span className="date">Voice Recording</span>
                            <span className="date">MP3</span>
                        </div>
                        <div className="description">
                            Welcome to Story Time with Owl! We curate all the best children's books read aloud on youtube! This channel is for parents and teachers alike and a resource to find great children's literature.
                        </div>
                        <div className="drawer"><span className="text"></span></div>
                    </div>
                </div>
            </div>
            <div className="book-player-info editor page-banner">
                <div>
                    <div className="image">
                        <img src="https://media-exp1.licdn.com/dms/image/C4E03AQFhszaqrjuRGw/profile-displayphoto-shrink_200_200/0/1641840277488?e=1651708800&v=beta&t=oAxVW-g6_ribZZOcxQI1duG8LyVAqZj-yFb6hIFV7rQ" alt="Editor of this page"/>
                    </div>

                    <div className="info">
                        <h4 className="title">Athena Wong</h4>
                        <hr/>
                        <div className="tags">
                            <span className="position">Co-Founder</span>
                            <span className="position">Managing Director</span>
                            <span className="last-date">Last Update March 21, 2022</span>
                            <span className="initial-date">Initial Update March 1, 2022</span>
                        </div>
                        <div className="description">
                            
                        </div>
                        <div className="drawer"><span className="text"></span></div>
                    </div>
                </div>
            </div>
        </div>
        <div className="article-content">
            <div>
                <h1>Read More</h1>
                <hr/>
                <div className="bottom-wrap">
                    <a className="rect-link -theme-dark" style={{"--background": "var(--col-purple)"} as CSSProperties} href="https://blackstonefoundationlibrary.overdrive.com/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/books_1f4da.png" alt=""/>
                        <span className="title">Borrow</span>
                        <span className="subtitle">Digital Library</span>
                        <div className="description">
                            BFL Digital Library powered by OverDrive.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "var(--col-mud)"} as CSSProperties} href="https://www.knowledgebookstore.com/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/notebook-with-decorative-cover_1f4d4.png" alt=""/>
                        <span className="title">Purchase</span>
                        <span className="subtitle">Knowledge Bookstore</span>
                        <div className="description">
                            Purchase empowering books online.
                        </div>
                    </a>
                </div>

                <h1>Learn</h1>
                <hr/>
                <div className="bottom-wrap">
                    <a className="rect-link -theme-dark" style={{"--background": "#882988"} as CSSProperties} href="https://thebfl.org/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/handshake_medium-dark-skin-tone_1f91d-1f3fe_1f3fe.png" alt=""/>
                        <span className="title">Peer Mentor Program</span>
                        <span className="subtitle">Do The Knowledge Online</span>
                        <div className="description">
                            Our Peer Mentor-driven program offering safe spaces that encourage self-awareness, self-expression and self-knowledge.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#12804e"} as CSSProperties} href="https://thebfl.org/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/woman-teacher-medium-dark-skin-tone_1f469-1f3fe-200d-1f3eb.png" alt=""/>
                        <span className="title">Workshop Series</span>
                        <span className="subtitle">Seeds of Wisdom</span>
                        <div className="description">
                            Our Afrocentric Literacy, Culture and Wellness workshop series for children ages 6 to 12 years.
                        </div>
                    </a>
                </div>

                <h1>Stay Updated</h1>
                <hr/>
                <div className="bottom-wrap">
                    <a className="rect-link -theme-dark" style={{"--background": "#68376d"} as CSSProperties} href="https://www.knowledgebookstore.com/blogs/knowledge-videos">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/speech-balloon_1f4ac.png" alt=""/>
                        <span className="title">Blog</span>
                        <span className="subtitle">Knowledge Videos and Articles</span>
                        <div className="description">
                            Stay updated with our blog.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#962a39"} as CSSProperties} href="https://www.knowledgebookstore.com/pages/events">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/tear-off-calendar_1f4c6.png" alt=""/>
                        <span className="title">Events</span>
                        <span className="subtitle">Keep Informed</span>
                        <div className="description">
                            Find out what's going on at Knowledge Bookstore and in our community. Knowledge Bookstore event listing has special events, authors signing, promotion and more.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#ad703e"} as CSSProperties} href="https://thebfl.org/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/memo_1f4dd.png" alt=""/>
                        <span className="title">Mailing List</span>
                        <span className="subtitle">Join our Mailing List</span>
                        <div className="description">
                            Stay updated with our mailing list.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#37579b"} as CSSProperties} href="https://www.knowledgebookstore.com/pages/newsletter-signup">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/newspaper_1f4f0.png" alt=""/>
                        <span className="title">Newsletter</span>
                        <span className="subtitle">Newsletter Signup</span>
                        <div className="description">
                            Signup for our newsletter.
                        </div>
                    </a>
                </div>

                <h1>Support</h1>
                <hr/>
                <div className="bottom-wrap">
                    <a className="rect-link -theme-dark" style={{"--background": "#1a5daa"} as CSSProperties} href="https://thebfl.org/thebrotherhood/">
                        <img className="icon" src="https://www.ecigclick.co.uk/wp-content/uploads/2020/11/paypal-bans-vaping.png" alt=""/>
                        <span className="title">PayPal</span>
                        <span className="subtitle">Donate</span>
                        <div className="description">
                            Donate to The Black Stone Foundation Library through VISA, MasterCard, American Express, Discover or PayPal.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#d88334"} as CSSProperties} href="https://thebfl.org/thebrotherhood/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/envelope_2709-fe0f.png" alt=""/>
                        <span className="title">Email Transfer</span>
                        <span className="subtitle">Support with Email Transfer</span>
                        <div className="description">
                            We accept email transfers at blackstonefoundationlibrary@gmail.com.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#632a63"} as CSSProperties} href="https://thebfl.org/thebrotherhood/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/raised-fist_dark-skin-tone_270a-1f3ff_1f3ff.png" alt=""/>
                        <span className="title">The Brotherhood</span>
                        <span className="subtitle">Partners for a Good Cause</span>
                        <div className="description">
                            Empowering our incarcerated Black and Indigenous brothers and sisters in Ontario.
                        </div>
                    </a>
                </div>

                <h1>Get Involved</h1>
                <hr/>
                <div className="bottom-wrap">
                    <a className="rect-link -theme-dark" style={{"--background": "#a3212c"} as CSSProperties} href="https://thebfl.org/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/basket_1f9fa.png" alt=""/>
                        <span className="title">Book Drive</span>
                        <span className="subtitle">Black Book Box</span>
                        <div className="description">
                            Our Community Book Drive, encouraging all to donate pre-loved books to our catalogue.
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#5a1a96"} as CSSProperties} href="https://docs.google.com/forms/d/e/1FAIpQLSfgk65YBlBnRviIffpBhI8IXEpOzL9A5w4KqutqXcTxaP1-BQ/viewform">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/hand-with-fingers-splayed_dark-skin-tone_1f590-1f3ff_1f3ff.png" alt=""/>
                        <span className="title">Volunteer</span>
                        <span className="subtitle">Volunteer Applications</span>
                        <div className="description">
                            Volunteers play a very integral part in how we enable safe spaces for knowledge-seekers. Sign up today!
                        </div>
                    </a>

                    <a className="rect-link -theme-dark" style={{"--background": "#693d18"} as CSSProperties} href="https://thebfl.org/">
                        <img className="icon" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/clipboard_1f4cb.png" alt=""/>
                        <span className="title">Hiring</span>
                        <span className="subtitle">Work with Us</span>
                        <div className="description">
                            Work at a position in The Black Stone Foundation Library.
                        </div>
                    </a>
                </div>
                {/* <br/>
                <p style={{textAlign: "center", padding: "auto 1rem"}}><a href="https://www.knowledgebookstore.com/" style={{color: "black"}} target="_blank" rel="noopener noreferrer">Looking for other books?</a></p>
                <br/> */}
            </div>
        </div>
        <footer id="footer" className="-theme-dark">
            <div className="content">
                <div className="description">
                    footer
                </div>
                <div className="social">

                </div>
            </div>
        </footer>
        <div id="fixed-screen">
            <p style={{
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
            zIndex: 16
            }} className="responsive-test"></p>
            <p style={{
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
            zIndex: 16
            }} className="responsive-test-below"></p>
        </div>
    </>
  );
}
