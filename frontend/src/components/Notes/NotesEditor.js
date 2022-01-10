import { useState } from "react";

export default function NotesEditor() {
	let note = { title: "Placeholder title", content: "placeholder content" };
	const [title, setTitle] = useState(note.title);
	const [content, setContent] = useState(note.content);

	return (
		<div>
			<input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
			<textarea placeholder="Start writing" value={content} onChange={e => setContent(e.target.value)}></textarea>
		</div>
	)
}
