import { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
	const history = useHistory();
	useEffect(() => {
		document.title = "This is probably not what you were searching for. | Evernote Clone";
	}, [])

	return (<>
		<img src="/images/404.svg" alt="404" />
		<div id="content-404">
			<h1>Hmm... something's disconnected</h1>
			<p>We can't find the page you asked for. Please check the URL or plug back into the homepage.</p>
			<button className="cta" onClick={e => history.push("/")}>HOMEPAGE</button>
		</div>
	</>)
}
