import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createNote } from "../../store/notes";
import { restoreSession } from "../../store/session";
import "./UserNav.css";

export default function UserNav({ userId }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);

	useEffect(() => {
		dispatch(restoreSession())
	}, [dispatch])

	return (
		<div id="user-nav">
			<li id="settings">
				<img id="profile-img" src="/images/profile-image.png" alt="profile" />
				<span id="username-span">{user.username}</span>
			</li>
			{/* <li>Search</li> */}
			<li className="user-nav-li no-bullet">
				<button id="new-note-button" onClick={e => dispatch(createNote({ userId, notebookId: null }))}>
					<i className="fas fa-solid fa-plus"></i> New Note
				</button></li>
			<li className="user-nav-li no-bullet">
				<div>
					<i className="fas fa-home user-nav-icon"></i>
					<NavLink to={`/user`} className="user-nav-link"> Home</NavLink>
				</div>
			</li>
			<ul id="links">
				<li className="user-nav-li no-bullet">
					<div>
						<i className="fas fa-solid fa-sticky-note user-nav-icon"></i>
						<NavLink to={`/notes`} className="user-nav-link"> Notes</NavLink>
					</div>
				</li>
				<li className="user-nav-li no-bullet">
					<i className="fas fa-solid fa-book user-nav-icon"></i>
					<NavLink to={`/notebooks`} className="user-nav-link"> Notebooks</NavLink>
				</li>
			</ul>
			<a id="money-button" href="https://github.com/sponsors/ntseng">Monetization Button</a>
			<div>
				<i className="fas fa-rocket user-nav-icon"></i>
				<a id="get-started" href="https://github.com/ntseng/aa-solo-react-project/blob/main/README.md"> Get Started</a>
			</div>
		</div>
	)
}
