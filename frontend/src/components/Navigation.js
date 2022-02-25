import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Redirect, useHistory } from "react-router-dom";
import { demoLogin } from "../store/session";

import "./css/NavBar.css";

export default function Navigation({ isLoaded }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const sessionUser = useSelector(state => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		return (<Redirect to="/user" />)
	} else {
		sessionLinks = (
			<nav id="utility-nav">
				<span className="nav-element pointer" onClick={e => {
					history.push("/user");
					return dispatch(demoLogin());
				}}>Demo Login</span>
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
						<Link to="/"><img id="logo" src={"/images/logo.svg"} alt="Evernote Clone logo" /></Link>
					</li>
					<li className="nav-element">
						<a href="https://github.com/ntseng" className="bold">DEVELOPER</a>
					</li>
					<li className="nav-element bold">
						<a href="https://github.com/ntseng/aa-solo-react-project/wiki/Tech-Stack">TECH STACK</a>
					</li>
					{isLoaded && sessionLinks}
				</div>
			</header>
		</>
	)
}
