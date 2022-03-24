import React from "react";

export default function HeroRow() {
	return (
		<div id="hero-container" className="centered">
			<div className="hero-img-container">
				<img id="demo-img" src="/images/landing.png" alt="App Demo" />
			</div>
			<div className="carousel-container">
				<div className="hero-carousel-texts">
					<div className="hero-carousel-text">
						<div className="heading">
							<p className="p-title hero-carousel-text-heading">WORK ANYWHERE</p>
						</div>
						<div className="description">
							<p className="p-small">Keep important info handy—your notes sync automatically to all your devices.</p>
						</div>
					</div>
					<div className="hero-carousel-text">
						<div className="heading">
							<p className="p-title hero-carousel-text-heading">REMEMBER EVERYTHING</p>
						</div>
						<div className="description">
							<p className="p-small">Make notes more useful by adding text, images, audio, scans, PDFs, and documents.</p>
						</div>
					</div>
					<div className="hero-carousel-text">
						<div className="heading">
							<p className="p-title hero-carousel-text-heading">TURN TO-DO INTO DONE</p>
						</div>
						<div className="description">
							<p className="p-small">Bring your notes, tasks, and schedules together to get things done more easily.</p>
						</div>
					</div>
					<div className="hero-carousel-text">
						<div className="heading">
							<p className="p-title hero-carousel-text-heading">FIND THINGS FAST</p>
						</div>
						<div className="description">
							<p className="p-small">Get what you need, when you need it with powerful, flexible search capabilities.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
