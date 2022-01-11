import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNotes } from "../../store/notes";
import NoteItem from "./NoteItem";

export default function NotesNav({ userId }) {
	const dispatch = useDispatch();
	let noteEntries = useSelector(state => Object.entries(state.notes).filter(([key, value]) => !!value));

	useEffect(() => {
		dispatch(fetchNotes({ id: userId }));
	}, [dispatch, userId])

	return (
		<>
			{noteEntries.map((note, index) => {
				if (/^\d+$/.test(note[0])) {
					return (<li key={index}><NoteItem note={note[1]} /></li>)
				}
			})}
		</>
	)
}
