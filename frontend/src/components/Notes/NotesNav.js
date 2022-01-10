import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../../store/notes";
import NoteItem from "./NoteItem";

export default function NotesNav({ userId }) {
	const dispatch = useDispatch();
	let { notes } = useSelector(state => state.notes);

	useEffect(() => {
		dispatch(getNotes({ id: userId }));
	}, [dispatch, userId])

	return (
		<>
			{Object.values(notes).map((note, index) => <li key={index}><NoteItem note={note} /></li>)}
		</>
	)
}
