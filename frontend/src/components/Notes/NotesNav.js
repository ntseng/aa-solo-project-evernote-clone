import NoteItem from "./NoteItem";

export default function NotesNav() {
	let notes = [{ title: "placeholder title", content: "yarr content", timestamp: "how to parse?" }, { title: "placeholder title", content: "yarr content", timestamp: "how to parse?" }];
	return (
		<>
			{notes.map(note => <li><NoteItem note={note} /></li>)}
		</>
	)
}
