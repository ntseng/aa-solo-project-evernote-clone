import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { showNote } from "../store/selected";

export default function NotesListItem({ note }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userId = useSelector(state => state.session.user.id);
	let contentPreview = note.content.slice(0, 50);
	if (note.content.length > 50) {
		contentPreview += "..."
	}

	return (
		<div className="note-item" onClick={e => {
			history.push("/notes");
			return dispatch(showNote({ userId, noteId: note.id }));
		}}>
			<div className="note-title">{note.title || "Untitled"}</div>
			<div className="note-content-preview">{contentPreview}</div>
			<div className="note-timestamp">{new Date(note.updatedAt).toTimeString()}</div>
		</div>
	)
}
