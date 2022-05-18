import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Author from "src/ts/models/BookOutlines/Author";
import Book from "src/ts/models/BookOutlines/Book";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";
import DateManagement from "src/ts/helpers/DateManagement";

import "./book-info.scss";

export default function AuthorInfo({outline}: {outline: BookOutline}) {
	const {book, author, reader, editor, source} = outline;
    
    return (
        <>
            {author && <BookPlayerInfo
                title={author.name}
                level={2}
                image={author.photo}
                alt="Book author"
                tags={[
                    author.born ? (author.died ? 
                        `${author.born.toStandardDateString()} - ${author.died.toStandardDateString()}` : 
                        `${author.born.toStandardDateString()}`) : undefined, 
                    author.age ? `${author.age} Years Old` : undefined,
                    author.location
                ].filter(tag => tag != undefined) as string[]}
                className="author"
            >
                {author.description}
            </BookPlayerInfo>}
        </>
	);
}
