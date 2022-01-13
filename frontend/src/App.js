import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch, useHistory } from "react-router-dom";

import { restoreSession } from "./store/session";
import Navigation from "./components/Navigation";
import ValueProp from "./components/Landing/valueProp";
import HeroRow from "./components/Landing/heroRow";
import AuthContainer from "./components/AuthContainer";
import CalendarBanner from "./components/Navigation/CalendarBanner";
import UserRoutes from "./components/UserRoutes";

function App() {
	const dispatch = useDispatch();
	const history = useHistory();
	const [isLoaded, setIsLoaded] = useState(false);

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
					<Route exact path={["/user", "/notes"]}>
						<UserRoutes />
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
