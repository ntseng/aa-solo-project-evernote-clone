import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "../../store/session";

export default function UserPage() {
	let user = useSelector(state => state.session.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(restoreSession())
	}, [dispatch])

	return (
		<div id="user-page">
			<div id="user-heading">
				<div id="greeting">{`Good Morning, ${user.username}!`}</div>
				<div id="clock">{new Date().toString()}</div>
			</div>
			<div id="user-widgets"></div>
		</div>
	)
}
