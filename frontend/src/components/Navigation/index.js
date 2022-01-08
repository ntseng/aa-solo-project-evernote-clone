import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { demoLogin } from "../../store/session";
import ProfileButton from "./ProfileButton";

import "./NavBar.css";

export default function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = (
			<ProfileButton user={sessionUser} />
		)
	} else {
		sessionLinks = (
			<nav id="utility-nav">
				<span className="nav-element" onClick={e => dispatch(demoLogin())}>Demo Login</span>
				<NavLink className="nav-element" id="login" to="/login">Log In</NavLink>
				<button className="nav-element" id="github-button">GitHub</button>
			</nav>
		)
	}
	return (
		<>
			<header id="navbar">
				<div className="centered nav-element-container">
					<li>
						<NavLink exact to="/"><img id="logo" src={"/images/logo.svg"} alt="Evernote Clone logo" /></NavLink>
					</li>
					<li className="nav-element">
						<span>Developer</span>
					</li>
					<li className="nav-element">
						<span>Tech Stack</span>
					</li>
					{isLoaded && sessionLinks}
				</div>
			</header>
			<div id="calendar-banner"></div>
		</>
	)
}
