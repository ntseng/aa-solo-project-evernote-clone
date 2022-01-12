import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { showNote } from "../../store/notes";

export default function NotesListItem({ note }) {
	const history = useHistory();
	const dispatch = useDispatch();
	const userId = useSelector(state => state.session.user.id);

	return (
		<div className="note-item" onClick={e => {
			history.push("/notes");
			return dispatch(showNote({ userId, noteId: note.id }));
		}}>
			<div>{note.title || "Untitled"}</div>
			<div>{new Date(note.updatedAt).toTimeString()}</div>
		</div>
	)
}
