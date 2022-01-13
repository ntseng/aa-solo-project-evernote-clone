import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = "notebooks/get";
const ADD_NOTEBOOK = "notebooks/add";

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

const postNotebook = notebook => ({
	type: ADD_NOTEBOOK,
	notebook
})

export function createNotebook({ userId }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notebooks", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				userId
			})
		})

		if (response.ok) {
			const { notebook } = await response.json();
			dispatch(postNotebook(notebook));
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
		case ADD_NOTEBOOK:
			updatedState[action.notebook.id] = action.notebook;
			return updatedState;
		default:
			return stateDotNotebooks;
	}
}
