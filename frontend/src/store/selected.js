import { csrfFetch } from "./csrf";

const SHOW_NOTE = "selected/SHOW_NOTE";

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

export function hideNote() {
	return async dispatch => {
		dispatch(displayNote(null));
	}
}

const SHOW_MODAL = "selected/SHOW_MODAL";

const setModal = (modalName) => ({
	type: SHOW_MODAL,
	modalName
})

export const showModal = function (modalName) {
	return async dispatch => {
		dispatch(setModal(modalName));
		return modalName;
	}
}

export const hideModal = function () {
	return async dispatch => {
		dispatch(setModal(null));
		return null;
	}
}

const INITIAL_STATE = { note: null, modal: null };

export default function reducer(stateDotSelected = INITIAL_STATE, action) {
	let updatedState = { ...stateDotSelected };
	switch (action.type) {
		case SHOW_NOTE:
			updatedState.note = action.note;
			return updatedState;
		case SHOW_MODAL:
			updatedState.modal = action.modalName;
			return updatedState;
		default:
			return stateDotSelected;
	}
}
