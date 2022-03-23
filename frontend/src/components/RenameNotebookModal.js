import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { editNotebook } from "../store/notebooks";
import { hideModal } from "../store/selected";
import "./css/Modal.css";

export default function RenameNotebookModal({ notebookId }) {
	const dispatch = useDispatch();
	const list = useSelector(state => state.notebooks[notebookId]);
	const [title, setTitle] = useState(list.title);

	function patchNotebook(e) {
		dispatch(editNotebook({ notebookId, title }));
		dispatch(hideModal());
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (<div id="modal-container">
		<div id="modal-title-container">
			<h2 id="modal-title">Rename notebook?</h2>
			<button id="modal-x-button"
				onClick={e => dispatch(hideModal())}
			>
				<i className="fa-solid fa-x" />
			</button>
		</div>
		<div id="modal-instructions">Notebook name</div>
		<input id="modal-input"
			type="text"
			value={title}
			onChange={e => setTitle(e.target.value)}
			onKeyDown={e => {
				if (e.key === "Enter" && title.trim().length && title.trim().length < 51) {
					patchNotebook(e);
				}
			}}
		/>
		<hr />
		<div>
			<button id="modal-add-button" className="modal-button"
				onClick={patchNotebook}
				disabled={!title.trim().length || title.trim().length > 50}
			>
				{title.trim().length < 51 ? "Save" : "Title too long"}
			</button>
			<button id="modal-cancel-button" className="modal-button"
				onClick={closeModal}
			>
				Cancel
			</button>
		</div>
	</div >)
}
