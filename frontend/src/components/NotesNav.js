import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchNotes } from "../store/notes";
import { showNote } from "../store/selected";
import NoteItem from "./NoteItem";

export default function NotesNav({ userId }) {
	const { notebookId } = useParams();
	const dispatch = useDispatch();
	const notes = useSelector(state => Object.values(state.notes).filter(note => !notebookId || note.notebookId === notebookId));

	useEffect(() => {
		dispatch(fetchNotes({ id: userId })).then(firstNote => {
			if (firstNote) {
				dispatch(showNote(firstNote))
			}
		});
	}, [dispatch, userId])

	return (
		<div id="notes-nav">
			{notes.length ? notes.map((note, index) => (<li className="no-bullet" key={index}><NoteItem note={note} /></li>)) : (
				<div id="empty-notes-message">
					<div>
						Create your first note
					</div>
					<div>
						Click the + New Note button in the sidebar to get started.
					</div>
				</div>
			)}
		</div>
	)
}
