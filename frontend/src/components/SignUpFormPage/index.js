import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

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

	if (sessionUser) return (
		<Redirect to="/" />
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
		<>
			<h1>Sign Up</h1>
			<form className="signup-form"
				onSubmit={handleSubmission}>
				<ul>
					{errors.map((error, index) => <li key={index}>{error}</li>)}
				</ul>
				<label>
					Username
					<input type="text"
						value={username}
						onChange={e => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Email
					<input type="text"
						value={email}
						onChange={e => setEmail(e.target.value)}
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
				<label>
					Confirm Password
					<input type="password"
						value={confirmPassword}
						onChange={e => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button type="submit">Login</button>
			</form>
		</>
	)
}
