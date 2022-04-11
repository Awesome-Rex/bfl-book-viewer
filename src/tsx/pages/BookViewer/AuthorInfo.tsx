import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Author from "src/ts/models/BookOutlines/Author";
import Book from "src/ts/models/BookOutlines/Book";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";

import "./book-info.scss";

export default function AuthorInfo({outline}: {outline: BookOutline}) {
	return (
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
	);
}
