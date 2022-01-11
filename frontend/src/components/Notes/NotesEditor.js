import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NotesEditor() {
	let note = useSelector(state => state.notes.currentNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
	}, [note])

	return (
		<div>
			<input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)}></input>
			<textarea placeholder="Start writing" value={content} onChange={e => setContent(e.target.value)}></textarea>
		</div>
	)
}
