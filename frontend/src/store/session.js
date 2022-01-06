import { csrfFetch } from "./csrf";

const INITIAL_STATE = {
	user: null
}
const LOGIN = "session/login";
const LOGOUT = "session/logout";

const setSessionUser = user => ({
	type: LOGIN,
	user
});

const clearSessionUser = () => ({
	type: LOGOUT
})

export function login(credentials) {
	return async dispatch => {
		const response = await csrfFetch("/api/session", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(credentials)
		})

		if (response.ok) {
			const { user } = await response.json();
			dispatch(setSessionUser(user));
		}
	}
}

export function logout() {
	return dispatch => {
		dispatch(clearSessionUser());
	}
}

export default function sessionReducer(state = INITIAL_STATE, action) {
	let updatedState = { ...state };
	switch (action.type) {
		case LOGIN:
			updatedState.user = action.user;
			return updatedState;
		case LOGOUT:
			updatedState.user = null;
			return updatedState;
		default:
			return state;
	}
}
