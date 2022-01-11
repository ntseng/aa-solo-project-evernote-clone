import { useSelector } from "react-redux";

export default function UserPage() {
	let user = useSelector(state => state.session.user);
	return (
		<>
			<div>{`Good Morning, ${user.username}!`}</div>
			<div>{new Date().toString()}</div>
		</>
	)
}
