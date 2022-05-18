import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import Reader from "src/ts/models/BookOutlines/Reader";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";
import DateManagement from "src/ts/helpers/DateManagement";

import "./book-info.scss";

export default function ReaderInfo({outline}: {outline: BookOutline}) {
	const {book, author, reader, editor, source} = outline;
    
    return (
        <>
            {reader && <BookPlayerInfo
                title={reader.name ?? reader.service ?? ""}
                level={3}
                image={reader.picture}
                alt="Reader of this book"
                //tags={["February 25, 2022", "Voice Recording", "MP3"]}
                tags={[
                    reader.name && reader.service ? reader.service : undefined,
                    outline.readDate?.toStandardDateString(), 
                    outline.type, outline.format
                ].filter(tag => tag != undefined) as string[]}
                className="reader"
            >
                {reader.description}
            </BookPlayerInfo>}
        </>
	);
}
