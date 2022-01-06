import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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
			<h1>Log in</h1>
			<form className="login-form"
				onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, index) => <li key={index}>{error}</li>)}
				</ul>
				<label>
					Username or Email
					<input type="text"
						value={credential}
						onChange={e => setCredential(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input type="password"
						value={password}
						onChange={e => setPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	)
}
