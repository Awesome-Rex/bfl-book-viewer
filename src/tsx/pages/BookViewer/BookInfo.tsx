import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import DateManagement from "src/ts/helpers/DateManagement";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";

import "./book-info.scss";

export default function BookInfo({outline}: {outline: BookOutline}) {
	const {book, author, reader, editor, source} = outline;
	
	return (
		<BookPlayerInfo
			title={book.title}
			level={1}
			image={typeof book.cover === "string" ? book.cover : undefined}
			alt="Book cover"
			tags={[
				author != undefined ? `Written by ${author?.name}` : undefined,
				book.illustrator != undefined ? `Illustrated by ${book.illustrator}` : undefined, 
				book.releaseDate?.toStandardDateString(), 
				`${book.totalPagesFull} Pages`,
				`${book.totalPages} Readable Pages`,
				book.language
			].filter(tag => tag != undefined) as string[]}
			className="book -theme-dark"
		>
			{book.description}
		</BookPlayerInfo>
	);
}
