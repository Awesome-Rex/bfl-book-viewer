import React, { CSSProperties } from "react";

import "./book-viewer.scss";

import "./Plain";

import BookPlayer from "tsx/components/BookPlayer";
import Navbar from "tsx/layout/Navbar";
import Footer from 'tsx/layout/Footer';
import ZoomToolbar from 'tsx/layout/ZoomToolbar';
import BookPlayerInfo from "tsx/components/BookPlayerInfo";
import RectLink from "tsx/components/RectLink";
import FixedScreen from 'tsx/layout/FixedScreen';
import ScrollContainer from "tsx/helpers/ScrollContainer";
import ArticleContent from "tsx/layout/ArticleContent";

export default function BookViewer() {
    return (
        <>
            <Navbar entries={[
                { name: "Read", href: "https://blackstonefoundationlibrary.overdrive.com/" },
                { name: "Purchase", href: "https://www.knowledgebookstore.com/" },
                { name: "About Us", href: "http://thebfl.org/" },
                { name: "Contact", href: "http://thebfl.org/" },
            ]}/>
            <ScrollContainer className="book-container" style={{ zIndex: 10 }} reserveTop={"0.75rem"} reserveBottom={"0.75rem"}>
                <BookPlayer />
            </ScrollContainer>
            <div className="total-book-info">
                <ZoomToolbar/>
                <BookPlayerInfo
                    title="The Cat in the Hat"
                    level={1}
                    image="https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png"
                    alt="Book cover"
                    tags={["Dr. Seuss", "March 12, 1957", "61 Pages"]}
                    className="book -theme-dark"
                >
                    {/* The Cat in the Hat is a tall anthropomorphic cat, who wears a red and white-striped hat and a red bow tie and sometimes has an umbrella with him mostly green, blue or red. He is a farm cat of Dr. Seuss's short story The Cat in the Hat. */}

                    <h1>Summary</h1>
                    <strong>This classic Dr. Seuss story can open up discussions about trust, responsibility, social expectations, and honesty.</strong>
                    <p>Two children, Sally and Sam, are home alone and having a very dreary day. Suddenly, they’re graced with a surprise visit from a stranger, the Cat. He comes in, assures them their mom won’t mind his toys and tricks, and makes a very big mess. Before the Cat leaves, he cleans up his mess, and when Sam and Sally’s mother returns home, nothing is amiss. The story ends with the question, “What would YOU do if your mother asked YOU?”</p>
                    <hr />
                    <h1>Guidelines for Philosophical Discussion</h1>
                    <p>The Cat in the Hat is a book where an eccentric stranger (who’s a cat!) visits two children, Sally and Sam, who are home alone and having a very dull day. Their mother is out, and when the Cat comes in, he reassures the kids that their mother won’t mind him or his tricks! This can offer an opportunity to talk about the first question set. You can discuss what trust is and who you can trust. It will be a concept that the kids will have been drilled about quite frequently, but hopefully, the book will offer them a new vantage point. They’ll be able to further develop why they have their opinions, not just what the right action is in a strange situation.</p>
                    <p>The story continues as the Cat falls while trying to balance too many things and drops everything that he was holding. As you talk with the kids about this section of the book, you can draw on the second question set. These questions ask who has responsibilities and why they might have them. Since children are often taught not to make a mess, it will offer them an opportunity to find their own reasons for why people keep telling them to be tidy, and what their responsibilities might be to themselves and others.</p>
                    <p>Another point of discussion that arises after the Cat drops what he was holding is what to do when someone does something wrong. The third question set deals with this. The Cat makes decisions that are very careless, presumably to amuse the children and himself. However, some of the things he does are dangerous and may not be acceptable for us to support. Should we laugh when people do wrong things to entertain us? Taking this approach can let the kids build off their previous experiences and help them decide how they want to act when approached with ‘wrong’ behavior.</p>
                    <p>The Cat, acknowledging that his poor balance thwarted his last attempt to entertain, tries another way to amuse the children. He brings in two friends, Thing One and Thing Two. These two Things make even more of a mess than the Cat did, and time is running out because the children spot their mother in the distance. This can bring up discussions about social expectations, which are in the fourth question set. You can discuss appropriate behavior, and how it might differ between your home and the home of a friend. Secondly, after seeing his mom, Sam decides that enough is enough. He decides to capture the Things. This introduces the kids to the concept of rudeness, and whether it’s okay or not to be rude to someone, a concept that stems from the book but relates directly to childrens’ lives.</p>
                    <p>As the mom comes in and Sally and Sam act as if nothing as happened, we are left to wonder the same question Dr. Seuss asks: would you tell your mom? This scenario offers the opportunity to discuss lying, the subject of the last question set. These questions seek to clear up some of the ambiguity surrounding lying. Can people be hurt by a lie even if they never find out that they’ve been told one? Since this draws on situations the kids might have encountered (deciding to lie or not), you’ll be able to draw concrete examples to keep them engaged. If they seem to be having difficulty engaging, you might want to create a scenario where someone has lied, and get the kids to discuss whether it was okay or not in the example (scenarios could include lying that you cheated on homework or lying to a friend). A note of warning: if you talk about real-life examples, the kids might try to bring up incidents that have happened in class. Lying is an important topic to introduce in a discussion, because most people are simply told not to lie, and not shown the damage of lying. When kids come to their own conclusions, they are much more likely to stick to them in times of distress.</p>
                    <hr />
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
                </BookPlayerInfo>
                <BookPlayerInfo
                    title="Dr. Seuss"
                    level={2}
                    image="https://cdn.vox-cdn.com/thumbor/iPafxYKSD_GagC6EiDyOff3NIB8=/0x0:3948x4018/1200x800/filters:focal(1371x986:2001x1616)/cdn.vox-cdn.com/uploads/chorus_image/image/68899768/1134107254.0.jpg"
                    alt="Book author"
                    tags={["March 2, 1904 - September 24, 1991", "America"]}
                    className="author"
                >
                    Dr. Seuss, pseudonym of Theodor Seuss Geisel, (born March 2, 1904, Springfield, Massachusetts, U.S.—died September 24, 1991, La Jolla, California), American writer and illustrator of immensely popular children’s books, which were noted for their nonsense words, playful rhymes, and unusual creatures.
                </BookPlayerInfo>
                <BookPlayerInfo
                    title="Story Time with Owl"
                    level={3}
                    image="https://yt3.ggpht.com/ytc/AKedOLRpXHWWHXHpv8drmCmEAkytrYl9nQ6-rFtoxSGM=s88-c-k-c0x00ffffff-no-rj"
                    alt="Reader of this book"
                    tags={["February 25, 2022", "Voice Recording", "MP3"]}
                    className="reader"
                >
                    Welcome to Story Time with Owl! We curate all the best children's books read aloud on youtube! This channel is for parents and teachers alike and a resource to find great children's literature.
                </BookPlayerInfo>
                <BookPlayerInfo
                    title="Athena Wong"
                    level={4}
                    image="https://media-exp1.licdn.com/dms/image/C4E03AQFhszaqrjuRGw/profile-displayphoto-shrink_200_200/0/1641840277488?e=1651708800&v=beta&t=oAxVW-g6_ribZZOcxQI1duG8LyVAqZj-yFb6hIFV7rQ"
                    alt="Editor of this page"
                    tags={["Co-Founder", "Managing Director", "Last Update March 21, 2022", "Initial Update March 1, 2022"]}
                    className="editor"
                ></BookPlayerInfo>
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
                            Our Peer Mentor-driven program offering safe spaces that encourage self-awareness, self-expression and self-knowledge.
                        </RectLink>

                        <RectLink
                            title="Workshop Series"
                            subtitle="Seeds of Wisdom"
                            icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/woman-teacher-medium-dark-skin-tone_1f469-1f3fe-200d-1f3eb.png"
                            background="#12804e"
                            href="https://thebfl.org/"
                            className="-theme-dark"
                        >
                            Our Afrocentric Literacy, Culture and Wellness workshop series for children ages 6 to 12 years.
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
                            Find out what's going on at Knowledge Bookstore and in our community. Knowledge Bookstore event listing has special events, authors signing, promotion and more.
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
                            Donate to The Black Stone Foundation Library through VISA, MasterCard, American Express, Discover or PayPal.
                        </RectLink>

                        <RectLink
                            title="Email Transfer"
                            subtitle="Support with Email Transfer"
                            icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/envelope_2709-fe0f.png"
                            background="#d88334"
                            href="https://thebfl.org/thebrotherhood/"
                            className="-theme-dark"
                        >
                            We accept email transfers at blackstonefoundationlibrary@gmail.com.
                        </RectLink>

                        <RectLink
                            title="The Brotherhood"
                            subtitle="Partners for a Good Cause"
                            icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/raised-fist_dark-skin-tone_270a-1f3ff_1f3ff.png"
                            background="#632a63"
                            href="https://thebfl.org/thebrotherhood/"
                            className="-theme-dark"
                        >
                            Empowering our incarcerated Black and Indigenous brothers and sisters in Ontario.
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
                            Our Community Book Drive, encouraging all to donate pre-loved books to our catalogue.
                        </RectLink>

                        <RectLink
                            title="Volunteer"
                            subtitle="Volunteer Applications"
                            icon="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/313/hand-with-fingers-splayed_dark-skin-tone_1f590-1f3ff_1f3ff.png"
                            background="#5a1a96"
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfgk65YBlBnRviIffpBhI8IXEpOzL9A5w4KqutqXcTxaP1-BQ/viewform"
                            className="-theme-dark"
                        >
                            Volunteers play a very integral part in how we enable safe spaces for knowledge-seekers. Sign up today!
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
            </FixedScreen>
        </>
    );
} 