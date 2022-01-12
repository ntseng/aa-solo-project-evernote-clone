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
		<>
			<div>{`Good Morning, ${user.username}!`}</div>
			<div>{new Date().toString()}</div>
		</>
	)
}
