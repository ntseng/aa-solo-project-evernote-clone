export default function CalendarBanner() {
	return (
		<div id="calendar-banner">
			<div className="container centered">
				<img id="calendar-img" src="/images/icon.png" alt="calendar" />
				<div className="content-container">
					<h2 className="h2-banner">This site may differ from Evernote</h2>
					<p id="banner-description">Check out what Evernote looked like while this site was being built (1/6/22 - 1/13/22).</p>
				</div>
				<a className="cta" href="https://github.com/ntseng/aa-solo-react-project/wiki/Wireframes">Wireframes</a>
			</div>
		</div>
	)
}
