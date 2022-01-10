export default function NoteItem({ note }) {
	return (
		<div>
			<div>{note.title}</div>
			<div>{note.content}</div>
			<div>{note.timestamp}</div>
		</div>
	)
}
