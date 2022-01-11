import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";

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
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreSession()).then(() => setIsLoaded(true));
	}, [dispatch])

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path="/">
						<Navigation isLoaded={isLoaded} />
						<ValueProp />
						<HeroRow />
					</Route>
					<Route path="/login">
						<AuthContainer newAccount={false} />
					</Route>
					<Route path="/signup">
						<AuthContainer newAccount={true} />
					</Route>
					<Route exact path="/user/">
						{user && (<>
							<UserNav userId={user.id} />
							<UserPage />
						</>)}
					</Route>
					<Route path="/notes/">
						{user && (<>
							<UserNav userId={user.id} />
							<NotesNav userId={user.id} />
							<NotesEditor noteId={1} />
						</>)}
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App;
