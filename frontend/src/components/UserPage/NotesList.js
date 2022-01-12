import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchNotes } from "../../store/notes";
import NotesListItem from "./NotesListItem";

export default function NotesList() {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);
	const notes = useSelector(state => state.notes);
	let notesArray = Object.entries(notes).reduce((array, entry) => /^\d+$/.test(entry[0]) ? [...array, entry[1]] : array, []);

	useEffect(() => {
		dispatch(fetchNotes({ id: user.id }));
	}, [])

	return (
		<div id="notes-list">
			<div>NOTES</div>
			<div id="note-item-container">
				{notesArray.map(note => <NotesListItem key={note.id} note={note} />)}
			</div>
		</div>
	)
}
