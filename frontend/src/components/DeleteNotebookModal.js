import React from "react";
import { useDispatch } from "react-redux";
import { trashNotebook } from "../store/notebooks";
import { hideModal } from "../store/selected";

export default function DeleteNotebookModal({ notebookId }) {
	const dispatch = useDispatch();

	return (<div id="modal-container">
		<div id="modal-title-container">
			<h2 id="modal-title">Delete notebook?</h2>
			<button id="modal-x-button"
				onClick={e => dispatch(hideModal())}
			>
				<i className="fa-solid fa-x" />
			</button>
		</div>
		<div id="modal-instructions">{"Any notes in the notebook will become uncategorized. This cannot be undone."}</div>
		<hr />
		<div>
			<button id="modal-delete-button" className="modal-button"
				onClick={e => {
					dispatch(trashNotebook({ notebookId }));
					dispatch(hideModal());
				}}
			>
				Yes, remove list
			</button>
			<button id="modal-cancel-button" className="modal-button"
				onClick={e => dispatch(hideModal())}
			>
				Cancel
			</button>
		</div>
	</div >)
}
