import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { demoLogin } from "../../store/session";
import ProfileButton from "./ProfileButton";

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
			<>
				<button onClick={e => dispatch(demoLogin())}>Demo Login</button>
				<NavLink to="/login">Login</NavLink>
				<NavLink to="/signup">Sign Up</NavLink>
			</>
		)
	}
	return (
		<ul>
			<li>
				<NavLink exact to="/">Home</NavLink>
				{isLoaded && sessionLinks}
			</li>
		</ul>
	)
}
