import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { restoreSession } from "./store/session";
import Navigation from "./components/Navigation";
import ValueProp from "./components/ValueProp";
import HeroRow from "./components/HeroRow";
import AuthContainer from "./components/AuthContainer";
import CalendarBanner from "./components/CalendarBanner";
import UserRoutes from "./components/UserRoutes";
import NotFound from "./components/NotFound";

function App() {
	const dispatch = useDispatch();
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
					<Route exact path={["/user", "/notes", "/notebooks"]}>
						<UserRoutes />
					</Route>
					<Route>
						<Navigation isLoaded={isLoaded} />
						<NotFound />
					</Route>
				</Switch>
			)}
		</>
	)
}

export default App;
