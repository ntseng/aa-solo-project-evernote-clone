import { useDispatch, useSelector } from "react-redux"
import { showNote } from "../../store/notes";

export default function NoteItem({ note }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);

	return (
		<div className="note-item" onClick={e => dispatch(showNote({ userId: user.id, noteId: note.id }))}>
			<div>{note.title}</div>
			<div>{note.content}</div>
			<div>{note.timestamp}</div>
		</div>
	)
}
