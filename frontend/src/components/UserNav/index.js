import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { createNote } from "../../store/notes";
import "./UserNav.css";

export default function UserNav({ userId }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.session.user);

	return (
		<div id="user-nav">
			<li id="settings">
				<img id="profile-img" src="https://www.evernote.com/shard/s647/user/231928776/photo?size=56" alt="profile" />
				<span id="username-span">{user.username}</span>
			</li>
			{/* <li>Search</li> */}
			<li className="user-nav-li no-bullet"><button id="new-note-button" onClick={e => dispatch(createNote({ userId, notebookId: null }))}>+ New Note</button></li>
			<li className="user-nav-li no-bullet">
				<NavLink to={`/user`} className="user-nav-link">Home</NavLink>
			</li>
			<ul id="links">
				<li className="user-nav-li no-bullet">
					<NavLink to={`/notes`} className="user-nav-link">Notes</NavLink>
				</li>
				<li className="user-nav-li no-bullet">
					<NavLink to={`/notebooks`} className="user-nav-link">Notebooks</NavLink>
				</li>
			</ul>
			<a id="money-button" href="https://github.com/sponsors/ntseng">Monetization Button</a>
			<a id="get-started" href="https://github.com/ntseng/aa-solo-react-project/blob/main/README.md">Get Started</a>
		</div>
	)
}
