import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNote, trashNote } from "../../store/notes";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.notes.currentNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		if (note) {
			setTitle(note.title);
			setContent(note.content);
		} else {
			setTitle("");
			setContent("");
		}
	}, [note])

	return (
		<div id="editor-container">
			<input placeholder="Title" id="title-input"
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<textarea placeholder="Start writing" id="content-textarea"
				value={content}
				onChange={e => setContent(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<button onClick={e => dispatch(trashNote({ noteId: note.id }))}>Delete</button>
		</div>
	)
}
