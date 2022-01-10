import { csrfFetch } from "./csrf";

const GET_NOTES = "notes/get";
const ADD_NOTE = "notes/add";
const EDIT_NOTE = "notes/edit";
const DELETE_NOTE = "notes/delete";

const getNotes = notes => ({
	type: GET_NOTES,
	notes
})

export function fetchNotes({ id }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/notes/${id}`);

		if (response.ok) {
			const { notes } = await response.json();
			dispatch(getNotes(notes));
		}
	}
}

const postNote = note => ({
	type: ADD_NOTE,
	note
})

export function createNote({ userId, notebookId }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notes", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId,
				notebookId
			})
		})

		if (response.ok) {
			const { note } = await response.json();
			dispatch(postNote(note));
		}
	}
}

const putNote = note => ({
	type: EDIT_NOTE,
	note
})

export function editNote({ noteId, notebookId, title, content }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notes", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				noteId,
				notebookId,
				title,
				content
			})
		})

		if (response.ok) {
			const { note } = await response.json();
			dispatch(putNote(note));
		}
	}
}

const deleteNote = noteId => ({
	type: DELETE_NOTE,
	noteId
})

export function trashNote({ noteId }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notes", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				noteId
			})
		})

		if (response.ok) {
			const { noteId: deletedNoteId } = await response.json();
			dispatch(deleteNote(deletedNoteId));
		}
	}
}

export default function notesReducer(stateDotNotes = {}, action) {
	let updatedState = { ...stateDotNotes };
	switch (action.type) {
		case GET_NOTES:
			action.notes.forEach(note => {
				updatedState[note.id] = note;
			})
			return updatedState;
		case ADD_NOTE:
		case EDIT_NOTE:
			updatedState[action.note.id] = action.note;
			return updatedState;
		case DELETE_NOTE:
			delete updatedState[action.noteId]
			return updatedState;
		default:
			return stateDotNotes;
	}
}
