import React from "react";
import { useDispatch } from "react-redux";
import { trashNote } from "../store/notes";
import { hideModal, hideNote } from "../store/selected";

export default function ConfirmDeleteModal({ noteId }) {
	const dispatch = useDispatch();

	function deleteNote(e) {
		dispatch(trashNote({ noteId }));
		dispatch(hideNote());
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="modal-container">
		<div id="modal-title-container">
			<h2 id="modal-title">Delete permanently?</h2>
			<button id="modal-x-button"
				onClick={closeModal}
			>
				<i className="fa-solid fa-x" />
			</button>
		</div>
		<div id="modal-instructions">{"Warning: The note will be gone forever. This action cannot be undone, even by Evernote Clone."}</div>
		<hr />
		<div id="modal-button-container">
			<button id="modal-delete-button"
				onClick={deleteNote}
			>
				Delete
			</button>
			<button id="modal-cancel-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
