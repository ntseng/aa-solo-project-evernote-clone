const router = require("express").Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.post("/test", function (req, res) {
	res.json({ requestBody: req.body });
})

if (process.env.NODE_ENV === "production") {
	const path = require("path");
	router.get("/", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.sendFile(
			path.resolve(__dirname, "../../frontend", "build", "index.html")
		)
	})

	router.use(express.static(path.res("../frontend/build")));

	router.get(/^(?!\/?api).*/, (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.sendFile(
			path.resolve(__dirname, "../../frontend", "build", "index.html")
		)
	})
} else {
	router.get("/api/csrf/restore", (req, res) => {
		res.cookie("XSRF-TOKEN", req.csrfToken());
		return res.json({});
	})
}

module.exports = router;
