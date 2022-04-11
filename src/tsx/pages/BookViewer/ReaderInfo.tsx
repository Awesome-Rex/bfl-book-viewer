import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import Reader from "src/ts/models/BookOutlines/Reader";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";

import "./book-info.scss";

export default function ReaderInfo({outline}: {outline: BookOutline}) {
	return (
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
	);
}
