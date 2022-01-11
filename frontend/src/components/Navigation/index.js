import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
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
				{/* TODO #68 demo login redirects to /user */}
				<span className="nav-element pointer" onClick={e => dispatch(demoLogin())}>Demo Login</span>
				<NavLink className="nav-element" id="login" to="/login">Log In</NavLink>
				<a className="nav-element" id="github-button" href="https://github.com/ntseng/aa-solo-react-project">GitHub</a>
			</nav>
		)
	}
	return (
		<>
			<header id="navbar">
				<div className="centered nav-element-container">
					<li>
						<Link exact to="/"><img id="logo" src={"/images/logo.svg"} alt="Evernote Clone logo" /></Link>
					</li>
					<li className="nav-element">
						<a href="https://github.com/ntseng" className="bold">DEVELOPER</a>
					</li>
					<li className="nav-element bold">
						<span>TECH STACK</span>
					</li>
					{isLoaded && sessionLinks}
				</div>
			</header>
			<div id="calendar-banner">
				<div className="container centered">
					<img id="calendar-img" src="/images/icon.png" alt="calendar" />
					<div className="content-container">
						<h2 className="h2-banner">This site may differ from Evernote</h2>
						<p id="banner-description">Check out what Evernote looked like while this site was being built (1/6/22 - 1/13/22).</p>
					</div>
					<a className="cta" href="https://github.com/ntseng/aa-solo-react-project/wiki/Wireframes">Wireframes</a>
				</div>
			</div>
		</>
	)
}
