import { useDispatch, useSelector } from "react-redux"
import { showNote } from "../store/notes";

export default function NoteItem({ note }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	let contentPreview = note.content.slice(0, 50);
	if (note.content.length > 50) {
		contentPreview += "..."
	}

	return (
		<div className="note-item" onClick={e => dispatch(showNote({ userId: user.id, noteId: note.id }))}>
			<div className="note-title">{note.title || "Untitled"}</div>
			<div className="note-content-preview">{contentPreview}</div>
			<div className="note-timestamp">{new Date(note.updatedAt).toTimeString()}</div>
		</div>
	)
}
