import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNote, trashNote } from "../../store/notes";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.notes.currentNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [disableInput, setDisableInput] = useState(false);

	useEffect(() => {
		if (note) {
			setTitle(note.title);
			setContent(note.content);
			setDisableInput(false);
		} else {
			setTitle("");
			setContent("");
			setDisableInput(true);
		}
	}, [note])

	return (
		<div>
			<input placeholder="Title"
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
				disabled={disableInput}
			/>
			<textarea placeholder="Start writing"
				value={content}
				onChange={e => setContent(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
				disabled={disableInput}
			/>
			<button onClick={e => dispatch(trashNote({ noteId: note.id }))}
				disabled={disableInput}
			>Delete</button>
		</div>
	)
}
