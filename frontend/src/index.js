import React from 'react';

import './index.css';

import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from './App';

import configureStore from "./store";
import { restoreCSRF, csrfFetch } from "./store/csrf.js";
import * as sessionActions from "./store/session.js";
import * as notesActions from "./store/notes.js";
import * as notebooksActions from "./store/notebooks.js";
import * as selectionActions from "./store/selected.js";

const store = configureStore();

if (process.env.NODE_ENV !== "production") {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
	window.notesActions = notesActions;
	window.notebooksActions = notebooksActions;
	window.selectionActions = selectionActions;
}

function Root() {
	return (
		<Provider store={store}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>
	)
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
