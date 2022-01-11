import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import "./LoginForm.css";
import { login } from "../../store/session.js";

export default function LoginFormPage() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	if (sessionUser) return (
		<Redirect to="/" />
	)

	function handleSubmission(e) {
		e.preventDefault();
		setErrors([]);
		return dispatch(login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		})
	}

	return (
		<>
			<img src="/images/icon.png" alt="logo" id="auth-logo" />
			<h1>Evernote Clone</h1>
			<span id="slogan">Remember everything important.</span>
			<form className="login-form"
				onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, index) => <li key={index}>{error}</li>)}
				</ul>
				<input type="text" className="text-input"
					placeholder="Email address or username"
					value={credential}
					onChange={e => setCredential(e.target.value)}
					required
				/>
				<input type="password" className="text-input"
					placeholder="Password"
					value={password}
					onChange={e => setPassword(e.target.value)}
					required
				/>
				<button type="submit" id="continue-button">Continue</button>
			</form>
			<div>Don't have an account?</div>
			<Link to="/signup" className="switch-link">Create account</Link>
		</>
	)
}
