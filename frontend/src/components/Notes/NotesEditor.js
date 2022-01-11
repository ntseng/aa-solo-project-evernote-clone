import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNote } from "../../store/notes";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.notes.currentNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		setTitle(note?.title || "");
		setContent(note?.content || "");
	}, [note])

	return (
		<div>
			<input placeholder="Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<textarea placeholder="Start writing"
				value={content}
				onChange={e => setContent(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
		</div>
	)
}
