import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchNotebooks } from "../store/notebooks";
import "./css/Notebooks.css";

export default function Notebooks({ userId }) {
	const dispatch = useDispatch();
	const notebooks = useSelector(state => state.notebooks);

	useEffect(() => {
		document.title = "Notebooks - Evernote Clone";
	}, [])

	useEffect(() => {
		dispatch(fetchNotebooks({ userId }));
	}, [dispatch, userId])

	return (
		<div id="notebooks-page">
			<div id="notebook-heading">
				<div id="notebooks-title" >Notebooks</div>
				<div>
					<input id="notebook-search" placeholder="Find notebooks..." />
				</div>
			</div>
			<div id="notebook-tablehead">
				<div>{Object.values(notebooks).length} notebooks</div>
				<button id="new-notebook-button"><i className="fas fa-solid fa-book" /> New Notebook</button>
			</div>
			<table>
				<thead>
					<tr>
						<th className="even-row title-cell">Title</th>
						<th className="even-row author-cell">Created By</th>
						<th className="even-row update-cell">Updated</th>
					</tr>
				</thead>
				<tbody>
					{notebooks ? Object.values(notebooks).map((notebook, index) => (
						<tr className={index % 2 ? "even-row" : "odd-row"} key={index}>
							<td className="title-cell">
								<Link to={`/notebooks/${notebook.id}`}>{notebook.title}</Link>
							</td>
							<td className="author-cell">{notebook.User.username}</td>
							<td className="update-cell">{new Date(notebook.updatedAt).toDateString()}</td>
						</tr>)) : "No notebooks yet..."}
				</tbody>
			</table>
		</div>
	)
}
