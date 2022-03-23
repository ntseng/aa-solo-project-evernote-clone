import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Modal } from "../context/Modal";
import { createNotebook, fetchNotebooks } from "../store/notebooks";
import { searchNotebooks } from "../store/notebooks";
import { hideModal, showModal } from "../store/selected";
import DeleteNotebookModal from "./DeleteNotebookModal";
import RenameNotebookModal from "./RenameNotebookModal";
import "./css/Notebooks.css";

export default function Notebooks({ userId }) {
	const dispatch = useDispatch();
	const notebooks = useSelector(state => state.notebooks);
	const modal = useSelector(state => state.selected.modal);

	useEffect(() => {
		document.title = "Notebooks - Evernote Clone";
	}, [])

	useEffect(() => {
		dispatch(fetchNotebooks({ userId }));
	}, [dispatch, userId])

	function openModal(modalName) {
		dispatch(showModal(modalName));
	}

	function closeModal(e) {
		dispatch(hideModal());
	}

	return (
		<div id="notebooks-page">
			<div id="notebook-heading">
				<div id="notebooks-title" >Notebooks</div>
				<div id="notebook-search-border">
					<input id="notebook-search"
						placeholder="Find notebooks..."
						onChange={event => dispatch(searchNotebooks({ userId, searchTerm: event.target.value }))}
					/>
				</div>
			</div>
			<div id="notebook-tablehead">
				<div>{Object.values(notebooks).length} notebooks</div>
				<button id="new-notebook-button"
					onClick={e => dispatch(createNotebook({ userId }))}
				><i className="fas fa-solid fa-book" /> New Notebook</button>
			</div>
			<table>
				<thead>
					<tr>
						<th className="even-row title-cell">Title</th>
						<th className="even-row author-cell">Created By</th>
						<th className="even-row update-cell">Updated</th>
						<th className="even-row actions-cell">Actions</th>
					</tr>
				</thead>
				<tbody>
					{notebooks ? Object.values(notebooks).map((notebook, index) => (
						<tr className={index % 2 ? "even-row" : "odd-row"} key={index}>
							<td className="title-cell"><i className="fas fa-solid fa-book" /> <Link className="notebook-link" to={`/notebooks/${notebook.id}`}>{notebook.title}</Link></td>
							<td className="author-cell">{notebook.User.username}</td>
							<td className="update-cell">{new Date(notebook.updatedAt).toDateString()}</td>
							<td className="actions-cell">
								<button className="list-button" title="Rename Notebook" onClick={e => openModal(`renameNotebook/${notebook.id}`)}><i className="fas fa-solid fa-pencil" /></button>
								<button className="list-button" title="Delete Notebook" onClick={e => openModal(`deleteNotebook/${notebook.id}`)}><i className="fas fa-solid fa-trash-can" /></button>
							</td>
						</tr>)) : "No notebooks yet..."}
				</tbody>
			</table>
			{modal && modal.startsWith("renameNotebook") && (
				<Modal onClose={closeModal}>
					<RenameNotebookModal notebookId={modal.split("/")[1]} />
				</Modal>
			)}
			{modal && modal.startsWith("deleteNotebook") && (
				<Modal onClose={closeModal}>
					<DeleteNotebookModal notebookId={modal.split("/")[1]} />
				</Modal>
			)}
		</div >
	)
}
