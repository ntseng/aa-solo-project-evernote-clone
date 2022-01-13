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
import CalendarBanner from "./components/Navigation/CalendarBanner";
import Notebooks from "./components/Notebooks";

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
						<Navigation isLoaded={isLoaded} />
						<CalendarBanner />
						<ValueProp />
						<HeroRow />
					</Route>
					<Route path="/login">
						<AuthContainer newAccount={false} />
					</Route>
					<Route path="/signup">
						<AuthContainer newAccount={true} />
					</Route>
					<Route exact path="/user">
						{user && (<div id="main-container">
							<UserNav userId={user.id} />
							<UserPage />
						</div>)}
					</Route>
					<Route path="/notes">
						{user && (<div id="main-container">
							<UserNav userId={user.id} />
							<NotesNav userId={user.id} />
							{hasCurrentNote && (<>
								<NotesEditor />
							</>)}
						</div>)}
					</Route>
					<Route path="/notebooks">
						{user && (<div id="main-container">
							<UserNav userId={user.id} />
							<Notebooks />
						</div>)}
					</Route>
					<Route>
						<Navigation isLoaded={isLoaded} />
						<img src="/images/404.svg" alt="404" />
						<div id="content-404">
							<h1>Hmm... something's disconnected</h1>
							<p>We can't find the page you asked for. Please check the URL or plug back into the homepage.</p>
							<button className="cta" onClick={e => history.push("/")}>HOMEPAGE</button>
						</div>
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App;
