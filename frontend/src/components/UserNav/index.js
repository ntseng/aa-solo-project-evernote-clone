import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { createNote } from "../../store/notes";
import { logout, restoreSession } from "../../store/session";
import "./UserNav.css";

export default function UserNav({ userId }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreSession())
	}, [dispatch])

	return (
		<div id="user-nav">
			<li id="settings">
				<img id="profile-img" src="/images/profile-image.png" alt="profile" />
				<div>
					<div id="username-span">{user.username}</div>
					<button id="signout-button" onClick={e => {
						history.push("/");
						return dispatch(logout())
					}}>Sign Out</button>
				</div>
			</li>
			{/* <li>Search</li> */}
			<button id="new-note-button" onClick={e => {
				history.push("/notes");
				return dispatch(createNote({ userId, notebookId: null }));
			}}>
				<i className="fas fa-solid fa-plus" /> New Note
			</button>
			<div id="links">
				<li className="user-nav-li no-bullet">
					<NavLink to="/user" className="user-nav-link">
						<div>
							<span className="link-text">
								<i className="fas fa-home user-nav-icon" /> Home
							</span>
						</div>
					</NavLink>
				</li>
				<li className="user-nav-li no-bullet">
					<NavLink to="/notes" className="user-nav-link">
						<div>
							<span className="link-text">
								<i className="fas fa-solid fa-sticky-note user-nav-icon" /> Notes
							</span>
						</div>
					</NavLink>
				</li>
				{/* <li className="user-nav-li no-bullet">
					<NavLink to="/notebooks" className="user-nav-link">
						<div>
							<i className="fas fa-solid fa-book user-nav-icon" /> Notebooks
						</div>
					</NavLink>
				</li> */}
			</div>
			<a id="money-button" href="https://github.com/sponsors/ntseng">Monetization Button</a>
			<a id="get-started" href="https://github.com/ntseng/aa-solo-react-project/blob/main/README.md"><i className="fas fa-rocket user-nav-icon" /> Get Started</a>
		</div>
	)
}
