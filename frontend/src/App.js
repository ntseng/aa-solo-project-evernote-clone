import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";

import { restoreSession } from "./store/session";
import Navigation from "./components/Navigation";
import ValueProp from "./components/Landing/valueProp";
import HeroRow from "./components/Landing/heroRow";
import AuthContainer from "./components/AuthContainer";

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(restoreSession()).then(() => setIsLoaded(true));
	}, [dispatch])

	return isLoaded && (
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
				</Switch>
			)}
		</>
	);
}

export default App;
