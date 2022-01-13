import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = "notebooks/get";

const getNotebooks = notebooks => ({
	type: GET_NOTEBOOKS,
	notebooks
})

export function fetchNotebooks({ userId }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/notebooks/${userId}`);

		if (response.ok) {
			const { notebooks } = await response.json();
			dispatch(getNotebooks(notebooks));
		}
	}
}

const INITIAL_STATE = {};

export default function notebooksReducer(stateDotNotebooks = INITIAL_STATE, action) {
	let updatedState = { ...stateDotNotebooks };
	switch (action.type) {
		case GET_NOTEBOOKS:
			action.notebooks.forEach(notebook => {
				updatedState[notebook.id] = notebook;
			})
			return updatedState;
		default:
			return stateDotNotebooks;
	}
}
