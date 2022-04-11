import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import EditorBFL from "src/ts/models/BookOutlines/EditorBFL";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";

import "./book-info.scss";

export default function EditorInfo({outline}: {outline: BookOutline}) {
	return (
		<BookPlayerInfo
            title="Athena Wong"
            level={4}
            image="https://media-exp1.licdn.com/dms/image/C4E03AQFhszaqrjuRGw/profile-displayphoto-shrink_200_200/0/1641840277488?e=1651708800&v=beta&t=oAxVW-g6_ribZZOcxQI1duG8LyVAqZj-yFb6hIFV7rQ"
            alt="Editor of this page"
            tags={["Co-Founder", "Managing Director", "Last Update March 21, 2022", "Initial Update March 1, 2022"]}
            className="editor"
        ></BookPlayerInfo>
	);
}
