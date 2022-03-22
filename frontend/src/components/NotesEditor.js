import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../context/Modal";
import { editNote } from "../store/notes";
import { hideModal, showModal } from "../store/selected";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

export default function NotesEditor() {
	const dispatch = useDispatch();
	let note = useSelector(state => state.selected.note);
	const modal = useSelector(state => state.selected.modal);

	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	useEffect(() => {
		document.title = "Notes - Evernote Clone";
	}, [])

	return (
		<div id="editor-container" onClick={e => dispatch(hideModal())}>
			<input placeholder="Title" id="title-input"
				disabled={!note}
				value={title}
				onChange={e => setTitle(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<textarea placeholder="Start writing" id="content-textarea"
				disabled={!note}
				value={content}
				onChange={e => setContent(e.target.value)}
				onBlur={e => dispatch(editNote({ noteId: note.id, notebookId: null, title, content }))}
			/>
			<button id="delete" className="delete-style"
				disabled={!note}
				onClick={e => {
					e.stopPropagation();
					dispatch(showModal("confirmDelete"));
				}}>Delete</button>
			{modal === "confirmDelete" && (
				<Modal onClose={e => dispatch(hideModal())}>
					<ConfirmDeleteModal noteId={note.id} />
				</Modal>
			)}
		</div>
	)
}
