import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";

import "./css/AuthContainer.css";

export default function AuthContainer({ newAccount }) {
	return (
		<div id="contianer-boundingbox">
			<div id="container">
				<div className="main">
					<div className="MinimalFormFrame">
						<div className="minimal-frame">
							<div className="minimal-wrapper">
								<div className="minimal-body">
									{newAccount ? <SignUpForm /> : <LoginForm />}
								</div>
							</div>
							<div className="footer wrapper">
								<Link id="tos-link" to="/">Go Home</Link>
								<Link id="privacy-link" to="/404">404 Page</Link>
								<span className="footer-entry">Student Project by Nathaniel Tseng.</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
