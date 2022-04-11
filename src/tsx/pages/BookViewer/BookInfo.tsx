import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";

import "./book-info.scss";

export default function BookInfo({outline}: {outline: BookOutline}) {
	return (
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
		</BookPlayerInfo>
	);
}
