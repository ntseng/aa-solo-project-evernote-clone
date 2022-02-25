import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchNotes } from "../store/notes";
import { showNote } from "../store/selected";
import NotesListItem from "./NotesListItem";

export default function NotesList() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const notes = useSelector(state => Object.values(state.notes));

	useEffect(() => {
		dispatch(fetchNotes({ id: user.id })).then(firstNote => {
			dispatch(showNote(firstNote));
		});
	}, [dispatch, user.id])

	return (
		<div id="notes-list">
			<div>NOTES</div>
			<div id="note-item-container">
				{notes.map((note, index) => <NotesListItem key={index} note={note} />)}
			</div>
		</div>
	)
}
