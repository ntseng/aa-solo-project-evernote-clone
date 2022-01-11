import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { createNote } from "../../store/notes";
import "./UserNav.css";

export default function UserNav({ userId }) {
	const dispatch = useDispatch();

	return (
		<ul id="user-nav">
			<li id="settings">
				<img alt="profile" />
				<div>Placeholder</div>
			</li>
			{/* <li>Search</li> */}
			<li className="no-bullet"><button onClick={e => dispatch(createNote({ userId, notebookId: null }))}>New Note</button></li>
			<li className="no-bullet">
				<NavLink to={`/user`} className="user-nav-link">Home</NavLink>
			</li>
			<ul id="links">
				<li className="no-bullet">
					<NavLink to={`/notes`} className="user-nav-link">Notes</NavLink>
				</li>
				<li className="no-bullet">
					<NavLink to={`/notebooks`} className="user-nav-link">Notebooks</NavLink>
				</li>
			</ul>
			<button>Upgrade</button>
			<li>Get Started</li>
		</ul>
	)
}
