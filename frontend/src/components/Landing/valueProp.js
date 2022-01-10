import { Link } from "react-router-dom";

export default function ValueProp() {
	return (
		<>
			<h1>Tame your work, organize your life</h1>
			<h5>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h5>
			<p className="cta">
				<Link to="/signup">Sign up for free</Link>
			</p>
			<p className="login-cta">
				<Link to="/login">Already have an account? Log in</Link>
			</p>
		</>
	)
}
