import { csrfFetch } from "./csrf";

const INITIAL_STATE = { notes: {} };
const GET_NOTES = "notes/get";
const ADD_NOTE = "notes/add";

const setNotes = notes => ({
	type: GET_NOTES,
	notes
})

export function getNotes({ id }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/notes/${id}`);

		if (response.ok) {
			const { notes } = await response.json();
			dispatch(setNotes(notes));
		}
	}
}

const addNote = note => ({
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
			dispatch(addNote(note));
		}
	}
}

export default function notesReducer(state = INITIAL_STATE, action) {
	let updatedState = { ...state };
	switch (action.type) {
		case GET_NOTES:
			action.notes.forEach(note => {
				updatedState.notes[note.id] = note;
			})
			return updatedState;
		case ADD_NOTE:
			updatedState.notes[action.note.id] = action.note;
			return updatedState;
		default:
			return state;
	}
}
