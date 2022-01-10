import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function NotesEditor({ noteId }) {
	let note = useSelector(state => state.notes[noteId]);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => { //TODO #57 Notes Page: load note values into input and textarea
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
