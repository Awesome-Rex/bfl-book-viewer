import { format } from "path";
import React from "react";
import BookOutline, { Format, VoiceType } from "src/ts/models/BookOutline";
import Author from "src/ts/models/BookOutlines/Author";
import Book from "src/ts/models/BookOutlines/Book";
import EditorBFL from "src/ts/models/BookOutlines/EditorBFL";
import Reader from "src/ts/models/BookOutlines/Reader";
import BookSource, { PageLayout } from "src/ts/models/BookSource";

const readers = {
    "Story Time with Owl": new Reader (
        "Story Time with Owl",
        undefined,
        "https://yt3.ggpht.com/ytc/AKedOLRpXHWWHXHpv8drmCmEAkytrYl9nQ6-rFtoxSGM=s88-c-k-c0x00ffffff-no-rj",
        <>
            Welcome to Story Time with Owl! We curate all the best children's books read aloud on youtube! This channel is for parents and teachers alike and a resource to find great children's literature.
        </>
    ),
}

const editors = {
    "Athena Wong": new EditorBFL (
        "Athena Wong",
        ["Co-Founder", "Managing Director"],
        "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
    )
}

const books = {
    "The Cat in the Hat": new BookOutline(
        new Book(
            new BookSource(
                require("src/assets/books/The Cat in the Hat.pdf"),
                PageLayout.Double,
                36,
                6,
                6,
                3,
                true,
                true
            ),
            "The Cat in the Hat",
            new Author (
                "Dr. Seuss",
                new Date(1904, 3 - 1, 2),
                new Date(1991, 9 - 1, 24),
                "United States",
                "https://cdn.vox-cdn.com/thumbor/iPafxYKSD_GagC6EiDyOff3NIB8=/0x0:3948x4018/1200x800/filters:focal(1371x986:2001x1616)/cdn.vox-cdn.com/uploads/chorus_image/image/68899768/1134107254.0.jpg",
                <>
                    Dr. Seuss, pseudonym of Theodor Seuss Geisel, (born March 2, 1904, Springfield, Massachusetts, U.S.—died September 24, 1991, La Jolla, California), American writer and illustrator of immensely popular children’s books, which were noted for their nonsense words, playful rhymes, and unusual creatures.
                </>
            ),
            undefined,
            new Date(1957, 3 - 1, 12),
            "English",
            "https://upload.wikimedia.org/wikipedia/en/1/10/The_Cat_in_the_Hat.png",
            <>
                <h1>Summary</h1>
                <strong>
                    This classic Dr. Seuss story can open up discussions about trust,
                    responsibility, social expectations, and honesty.
                </strong>
                <p>
                    Two children, Sally and Sam, are home alone and having a very dreary
                    day. Suddenly, they’re graced with a surprise visit from a stranger, the
                    Cat. He comes in, assures them their mom won’t mind his toys and tricks,
                    and makes a very big mess. Before the Cat leaves, he cleans up his mess,
                    and when Sam and Sally’s mother returns home, nothing is amiss. The
                    story ends with the question, “What would YOU do if your mother asked
                    YOU?”
                </p>
                <hr />
                <h1>Guidelines for Philosophical Discussion</h1>
                <p>
                    The Cat in the Hat is a book where an eccentric stranger (who’s a cat!)
                    visits two children, Sally and Sam, who are home alone and having a very
                    dull day. Their mother is out, and when the Cat comes in, he reassures
                    the kids that their mother won’t mind him or his tricks! This can offer
                    an opportunity to talk about the first question set. You can discuss
                    what trust is and who you can trust. It will be a concept that the kids
                    will have been drilled about quite frequently, but hopefully, the book
                    will offer them a new vantage point. They’ll be able to further develop
                    why they have their opinions, not just what the right action is in a
                    strange situation.
                </p>
                <p>
                    The story continues as the Cat falls while trying to balance too many
                    things and drops everything that he was holding. As you talk with the
                    kids about this section of the book, you can draw on the second question
                    set. These questions ask who has responsibilities and why they might
                    have them. Since children are often taught not to make a mess, it will
                    offer them an opportunity to find their own reasons for why people keep
                    telling them to be tidy, and what their responsibilities might be to
                    themselves and others.
                </p>
                <p>
                    Another point of discussion that arises after the Cat drops what he was
                    holding is what to do when someone does something wrong. The third
                    question set deals with this. The Cat makes decisions that are very
                    careless, presumably to amuse the children and himself. However, some of
                    the things he does are dangerous and may not be acceptable for us to
                    support. Should we laugh when people do wrong things to entertain us?
                    Taking this approach can let the kids build off their previous
                    experiences and help them decide how they want to act when approached
                    with ‘wrong’ behavior.
                </p>
                <p>
                    The Cat, acknowledging that his poor balance thwarted his last attempt
                    to entertain, tries another way to amuse the children. He brings in two
                    friends, Thing One and Thing Two. These two Things make even more of a
                    mess than the Cat did, and time is running out because the children spot
                    their mother in the distance. This can bring up discussions about social
                    expectations, which are in the fourth question set. You can discuss
                    appropriate behavior, and how it might differ between your home and the
                    home of a friend. Secondly, after seeing his mom, Sam decides that
                    enough is enough. He decides to capture the Things. This introduces the
                    kids to the concept of rudeness, and whether it’s okay or not to be rude
                    to someone, a concept that stems from the book but relates directly to
                    childrens’ lives.
                </p>
                <p>
                    As the mom comes in and Sally and Sam act as if nothing as happened, we
                    are left to wonder the same question Dr. Seuss asks: would you tell your
                    mom? This scenario offers the opportunity to discuss lying, the subject
                    of the last question set. These questions seek to clear up some of the
                    ambiguity surrounding lying. Can people be hurt by a lie even if they
                    never find out that they’ve been told one? Since this draws on
                    situations the kids might have encountered (deciding to lie or not),
                    you’ll be able to draw concrete examples to keep them engaged. If they
                    seem to be having difficulty engaging, you might want to create a
                    scenario where someone has lied, and get the kids to discuss whether it
                    was okay or not in the example (scenarios could include lying that you
                    cheated on homework or lying to a friend). A note of warning: if you
                    talk about real-life examples, the kids might try to bring up incidents
                    that have happened in class. Lying is an important topic to introduce in
                    a discussion, because most people are simply told not to lie, and not
                    shown the damage of lying. When kids come to their own conclusions, they
                    are much more likely to stick to them in times of distress.
                </p>
                <hr />
                <h1>Questions for Philosophical Discussion</h1>
                <h2>Trust</h2>
                The Cat reassures the children that what he is doing is okay and that
                their mother won’t mind…
                <ol>
                    <li>Would have you trusted the cat?</li>
                    <li>
                        When can you trust strangers? What if they’re a teacher or a
                        policeman?
                    </li>
                    <li>How do you know that you can trust your friends?</li>
                    <li>What is trust?</li>
                </ol>
                <h2>Responsibility</h2>
                The Cat, with all of his games, made quite a mess in Sally and Sam’s
                house…
                <ol>
                    <li>Would have you trusted the cat?</li>
                    <li>
                        When can you trust strangers? What if they’re a teacher or a
                        policeman?
                    </li>
                    <li>How do you know that you can trust your friends?</li>
                    <li>What is trust?</li>
                </ol>
            </>
        ),
        readers["Story Time with Owl"],
        editors["Athena Wong"],
        new Date(2022, 5 - 1, 4),
        new Date(2022, 2 - 1, 25),
        undefined,
        VoiceType.VoiceRecording,
        Format.MP3
    ),
    "Abe the Service Dog": new BookOutline(
        new Book(
            new BookSource(
                require("src/assets/books/Abe the Service Dog.pdf"),
                PageLayout.Single,
                25,
                3,
                3,
                2
            ),
            "Abe the Service Dog",
            new Author(
                "T. Albert",
                undefined,
                undefined,
                undefined,
                "https://img.dealdrop.com/fit-in/120x120/logos/monkeypen.com-logo-coupons.png",
                <>
                    <strong>Where it began…</strong>

                    One fine day, a group of friends and fellow-artists decided to come together to launch their dream venture. The idea was not just to achieve success but to ‘make a dent in the universe’. A whopping, big one.... "A 10 Thousand Free Children’s Book Project"

                    <strong>The Vision:</strong>

                    We believe that books should be the cornerstone of every childhood and we are committed to making this dream a reality with our "10 Thousand Free Children’s Book Project". The books created as a part of this project will provide children with access to quality books that entertain and educate. While entertaining the children, the books will also instil them with values and skills, that traditional schools do not teach. I.e Money management, relationship building, investment in health, self-mastery: these are some issues of critical importance that the books will illuminate for the young readers. The purpose is to catalyze a process, which will transform the children of today into kind and conscious global citizens of tomorrow.

                    <strong>The Mission:</strong>

                    Ten thousand free children’s books - that’s Monkey Pen’s mission and we hope that you will partner us on this exciting journey. Monkey Pen has already kick-started the ‘Free Book Project’ with creation of some new titles (click here), which will be financed by the sales of personalised children’s books. Each book sale contributes to one page of the free book, and each customer then becomes a partner in the ‘Free Book Project’. All the profits from the personalised children’s books will be rolled back into the ‘Free Book Project’, eventually providing thousands of free children’s books to young readers everywhere.

                    <strong>Partner with us:</strong>

                    When you choose Monkey Pen, you choose to deal with a company that has a strong value system and a reputation for highly professional services. We are quick, reliable, provide value for money and always deliver to the deadline. With a rating of 9.2 out of 10 on the Trustpilot Reviews, it is clear that customer satisfaction is guaranteed with Monkey Pen. Join us in our mission to create dynamic global citizens for a better tomorrow, by partnering with us in the “10 Thousand Free Children’s Book Project”.
                </>
            ),
            "maailillustrations.com",
            undefined,
            "English",
            "http://freekidsbooks.org/wp-content/uploads/2021/11/Abe-the-service-dog.jpg",
            <>
                Abe was picked for a special job, he was going to learn how to be a service dog. And not just any service dog, Abe was going to help be the eyes for a blind person. this is his story.

                Service Dogs are smart, well trained, well behaved, dedicated, and committed to ensuring their master is safe. They are sometimes the eyes of their master, a companion and aid to the mentally challenged, and an early warning system for those with seizures and other intermittent disorders. This book is intended to bring an awareness of their importance to early readers.
            </>
        ),
        readers["Story Time with Owl"],
        editors["Athena Wong"],
        new Date(2021, 3, 6),
        new Date(2021, 3, 14),
        new Date(2022, 4, 9),
        VoiceType.VoiceRecording,
        Format.WAV
    ),
    "The Green Fern Zoo": new BookOutline(
        new Book(
            new BookSource(
                "src/assets/books/The Green Fern Zoo.pdf",
                PageLayout.Half,
                87,
                7,
                7,
                6,
                true,
                false
            ),
            "The Green Fern Zoo",
            undefined,
            undefined,
            undefined,
            "English",
            "https://www.engageny.org/sites/default/files/view-images/ckla_g1_u4_rdr_cvr.jpg",
            <>
                The decodable Reader for Unit 4 is "The Green Fern Zoo." In this reader, the main character, Vern, introduces students to many different types of animals. While Vern is a fictional character, the information in the book is factual, making this an informational text. The stories in the CKLA program are 100% decodable, meaning they are made up entirely of spellings and Tricky Words introduced or reviewed quickly in class during previous lessons.
            </>
        ),
        readers["Story Time with Owl"],
        editors["Athena Wong"],
        new Date(2021, 3, 6),
        new Date(2021, 3, 14),
        new Date(2022, 4, 9),
        VoiceType.TTS,
        Format.WAV
    )
};

export default books;