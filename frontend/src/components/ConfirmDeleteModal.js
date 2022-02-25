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

	return (<div id="new-list-container">
		<div id="new-list-title">Delete note</div>
		<button id="x-button"
			onClick={closeModal}
		>
			<i className="fa-solid fa-x" />
		</button>
		<div id="list-modal-instructions">{`Are you sure you wish to delete this note?`}</div>
		<div>
			<button id="new-list-add-button"
				onClick={deleteNote}
			>
				Yes, delete note
			</button>
			<button id="new-list-cancel-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
