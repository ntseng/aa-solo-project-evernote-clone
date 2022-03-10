import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotebooks } from "../store/notebooks";

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
				<div>Notebooks</div>
				{notebooks ? Object.values(notebooks).map((notebook, index) => (<div key={index}>{notebook.title}</div>)) : "No notebooks yet..."}
			</div>
			<div id="notebooks-list">
				{ }
			</div>
		</div>
	)
}
