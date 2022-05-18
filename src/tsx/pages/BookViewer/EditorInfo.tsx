import React from "react";
import BookOutline from "src/ts/models/BookOutline";
import Book from "src/ts/models/BookOutlines/Book";
import EditorBFL from "src/ts/models/BookOutlines/EditorBFL";
import BookPlayerInfo from "src/tsx/components/BookPlayerInfo";
import DateManagement from "src/ts/helpers/DateManagement";

import "./book-info.scss";

export default function EditorInfo({ outline }: { outline: BookOutline }) {
	const { book, author, reader, editor, source } = outline;

	return (
		<>
			{editor && <BookPlayerInfo
				title={editor.name}
				level={4}
				image={editor.picture}
				alt="Editor of this page"
				tags={[
					...editor.positions,
					outline.lastUpdate != undefined ? `Last Updated ${outline.lastUpdate?.toStandardDateString()}` : undefined,
					outline.initialUpdate != undefined ? `Initial Update ${outline.initialUpdate?.toStandardDateString()}` : undefined
				].filter(tag => tag != undefined) as string[]}
				className="editor"
			>
				{editor.description}
			</BookPlayerInfo>}
		</>
	);
}
