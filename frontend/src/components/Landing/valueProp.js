import { Link } from "react-router-dom";

export default function ValueProp() {
	return (
		<div id="value-prop-div">
			<h1>Tame your work, organize your life</h1>
			<h5>Remember everything and tackle any project with your notes, tasks, and schedule all in one place.</h5>
			<p>
				<Link className="cta" to="/signup">Sign up for free</Link>
			</p>
			<p className="login-cta">
				<Link to="/login">Already have an account? Log in</Link>
			</p>
		</div>
	)
}
