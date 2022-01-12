import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import { restoreSession } from "./store/session";
import Navigation from "./components/Navigation";
import ValueProp from "./components/Landing/valueProp";
import HeroRow from "./components/Landing/heroRow";
import AuthContainer from "./components/AuthContainer";
import UserNav from "./components/UserNav";
import UserPage from "./components/UserPage";
import NotesNav from "./components/Notes/NotesNav";
import NotesEditor from "./components/Notes/NotesEditor";

function App() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector(state => state.session.user);
	const currentNote = useSelector(state => state.notes.currentNote);
	const hasCurrentNote = !!currentNote && !!Object.entries(currentNote).length;

	useEffect(() => {
		dispatch(restoreSession()).then(() => setIsLoaded(true));
	}, [dispatch])

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						{user ? history.push("/user") : (<>
							<Navigation isLoaded={isLoaded} />
							<ValueProp />
							<HeroRow />
						</>)}
					</Route>
					<Route path="/login">
						<AuthContainer newAccount={false} />
					</Route>
					<Route path="/signup">
						<AuthContainer newAccount={true} />
					</Route>
					<Route exact path="/user/">
						{user ? (<div id="main-container">
							<UserNav userId={user.id} />
							<UserPage />
						</div>) : history.push("/")}
					</Route>
					<Route path="/notes/">
						{user ? (<div id="main-container">
							<UserNav userId={user.id} />
							<NotesNav userId={user.id} />
							{hasCurrentNote && (<>
								<NotesEditor />
							</>)}
						</div>) : history.push("/")}
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App;
