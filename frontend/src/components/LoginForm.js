import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

import "./css/LoginForm.css";
import { login } from "../store/session.js";

export default function LoginForm() {
	const dispatch = useDispatch();
	const sessionUser = useSelector(state => state.session.user);
	const [credential, setCredential] = useState("");
	const [password, setPassword] = useState("");
	const [errors, setErrors] = useState([]);

	useEffect(() => {
		document.title = "Welcome Back"
	}, [])

	if (sessionUser) {
		return (<Redirect to="/user" />)
	}

	function handleSubmission(e) {
		e.preventDefault();
		setErrors([]);
		return dispatch(login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		})
	}

	return (
		<div id="login-container">
			<img src="/images/icon.png" alt="logo" id="auth-logo" />
			<h1 id="login-h1">Evernote Clone</h1>
			<span id="slogan">Remember everything important.</span>
			<form className="login-form"
				onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, index) => <li key={index} className="error-message">{error}</li>)}
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
		</div>
	)
}
