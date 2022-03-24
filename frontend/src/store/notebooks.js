import { csrfFetch } from "./csrf";

const GET_NOTEBOOKS = "notebooks/get";
const ADD_NOTEBOOK = "notebooks/add";
const EDIT_NOTEBOOK = "notebooks/edit";
const DELETE_NOTEBOOK = "notebooks/delete";

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


export function searchNotebooks({ userId, searchTerm }) {
	return async dispatch => {
		const response = await csrfFetch(`/api/notebooks/${userId}/${searchTerm}`);

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

const putNotebook = notebook => ({
	type: EDIT_NOTEBOOK,
	notebook
})

export function editNotebook({ notebookId, title }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notebooks", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				notebookId,
				title
			})
		})

		if (response.ok) {
			const { notebook } = await response.json();
			dispatch(putNotebook(notebook));
		}
	}
}

const deleteNotebook = notebookId => ({
	type: DELETE_NOTEBOOK,
	notebookId
})

export function trashNotebook({ notebookId }) {
	return async dispatch => {
		const response = await csrfFetch("/api/notebooks", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				notebookId
			})
		})

		if (response.ok) {
			const { notebookId: deletedNotebookId } = await response.json();
			dispatch(deleteNotebook(deletedNotebookId));
		}
	}
}

const INITIAL_STATE = {};

export default function notebooksReducer(stateDotNotebooks = INITIAL_STATE, action) {
	let updatedState = { ...stateDotNotebooks };
	switch (action.type) {
		case GET_NOTEBOOKS:
			const cleanState = {};
			action.notebooks.forEach(notebook => {
				cleanState[notebook.id] = notebook;
			})
			return cleanState;
		case ADD_NOTEBOOK:
		case EDIT_NOTEBOOK:
			updatedState[action.notebook.id] = action.notebook;
			return updatedState;
		case DELETE_NOTEBOOK:
			delete updatedState[action.notebookId];
			return updatedState;
		default:
			return stateDotNotebooks;
	}
}
