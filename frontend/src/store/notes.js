import { csrfFetch } from "./csrf";

const INITIAL_STATE = { notes: {} };
const GET_NOTES = "notes/get";

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

export default function notesReducer(state = INITIAL_STATE, action) {
	let updatedState = { ...state };
	switch (action.type) {
		case GET_NOTES:
			action.notes.forEach(note => {
				updatedState.notes[note.id] = note;
			})
			return updatedState;
		default:
			return state;
	}
}
