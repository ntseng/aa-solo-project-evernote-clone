import { Link } from "react-router-dom";

export default function UserNav({ userId }) {
	return (
		<ul id="user-nav">
			<li id="settings">
				<img alt="profile" />
				<div>Placeholder</div>
			</li>
			{/* <li>Search</li> */}
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
