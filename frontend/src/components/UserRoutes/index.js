import { useSelector } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom"
import NotesEditor from "../Notes/NotesEditor";
import NotesNav from "../Notes/NotesNav"
import UserNav from "../UserNav"
import UserPage from "../UserPage"

export default function UserRoutes() {
	const user = useSelector(state => state.session.user);
	const currentNote = useSelector(state => state.notes.currentNote);
	const hasCurrentNote = !!currentNote && !!Object.entries(currentNote).length;

	if (!user) {
		return (<Redirect to="/" />)
	} else {
		return (
			<Switch>
				<Route path="/user">
					{user && (<div id="main-container">
						<UserNav userId={user.id} />
						<UserPage />
					</div>)}
				</Route>
				<Route path="/notes">
					{user && (<div id="main-container">
						<UserNav userId={user.id} />
						<NotesNav userId={user.id} />
						{hasCurrentNote ? (<>
							<NotesEditor />
						</>) : (<div id="placeholder-container"></div>)}
					</div>)}
				</Route>
			</Switch>
		)
	}
}
