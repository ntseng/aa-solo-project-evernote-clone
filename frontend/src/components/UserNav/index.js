import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { createNote } from "../../store/notes";

export default function UserNav({ userId }) {
	const dispatch = useDispatch();
	console.log(userId);
	return (
		<ul id="user-nav">
			<li id="settings">
				<img alt="profile" />
				<div>Placeholder</div>
			</li>
			{/* <li>Search</li> */}
			<li><button onClick={e => dispatch(createNote({ userId, notebookId: null }))}>New Note</button></li>
			<li>Home</li>
			<ul id="links">
				<li>
					<Link to={`/notes`}>Notes</Link>
				</li>
				<li>
					<Link to={`/notebooks`}>Notebooks</Link>
				</li>
			</ul>
			<button>Upgrade</button>
			<li>Get Started</li>
		</ul>
	)
}
