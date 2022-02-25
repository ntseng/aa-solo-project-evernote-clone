import { csrfFetch } from "./csrf";

const SHOW_NOTE = "notes/display";

const displayNote = note => ({
	type: SHOW_NOTE,
	note
})

export function showNote({ userId, noteId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/notes/${userId}`);

		if (response.ok) {
			const { notes } = await response.json();
			dispatch(displayNote(notes.find(note => note.id === noteId)));
		}
	}
}

const INITIAL_STATE = { note: {}, notebookId: null };

export default function reducer(stateDotSelected = INITIAL_STATE, action) {
	let updatedState = { ...stateDotSelected };
	switch (action.type) {
		case SHOW_NOTE:
			updatedState.note = action.note;
			return updatedState;
		default:
			return stateDotSelected;
	}
}
