import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import "./SignUpForm.css";
import { signUp } from "../../store/session.js";

export default function SignUpFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		document.title = "Create an Evernote Clone Account";
	}, [])

	if (sessionUser) return (
		<Redirect to="/user" />
	)

	function handleSubmission(e) {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(signUp({ username, email, password })).catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) setErrors(data.errors);
			})
		} else {
			return setErrors(['Confirm Password field must be the same as the Password field.']);
		}
	}

	return (
		<div id="login-container">
			<img src="/images/icon.png" alt="logo" id="auth-logo" />
			<h1 id="login-h1">Evernote Clone</h1>
			<span id="slogan">Remember everything important.</span>
			<form className="signup-form"
				onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, index) => <li key={index} className="error-message">{error}</li>)}
				</ul>
				<input type="text" className="text-input"
					placeholder="Username"
					value={username}
					onChange={e => setUsername(e.target.value)}
					required
				/>
				<input type="text" className="text-input"
					placeholder="Email"
					value={email}
					onChange={e => setEmail(e.target.value)}
					required
				/>
				<input type="password" className="text-input"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<input type="password" className="text-input"
					placeholder="Confirm Password"
					value={confirmPassword}
					onChange={e => setConfirmPassword(e.target.value)}
					required
				/>
				<button type="submit" id="continue-button">Continue</button>
			</form>
			<span id="disclaimer">No ToS or Privacy Policy, but maybe you'd like to <Link to="/" className="switch-link">Go Home</Link> or view the <Link to="/404" className="switch-link">404 Page</Link>.</span>
			<span>Already have an account?</span>
			<Link to="/login" className="switch-link">Sign in</Link>
		</div>
	)
}
