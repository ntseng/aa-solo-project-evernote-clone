import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNote, trashNote } from "../store/notes";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.notes.currentNote);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [hideConfirmDelete, setHideConfirmDelete] = useState(true);

	useEffect(() => {
		document.title = "Notes - Evernote Clone";
	}, [])

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
		<div id="editor-container" onClick={e => setHideConfirmDelete(true)}>
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
			<button id="delete" className="delete-style" onClick={e => {
				e.stopPropagation();
				setHideConfirmDelete(false);
			}}>Delete</button>
			<div id="confirm-delete-container" hidden={hideConfirmDelete}>
				<div>Really Delete?</div>
				<button id="confirm-delete" className="delete-style" onClick={e => dispatch(trashNote({ noteId: note.id }))}>Yes, delete this note</button>
			</div>
		</div>
	)
}
