const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { environment } = require("./config");
const isProduction = environment === "production";
const { ValidationError } = require("sequelize");

const routes = require("./routes");

const app = express();

app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());

//#region Security
if (!isProduction) {
	app.use(cors());
}

app.use(helmet({
	contentSecurityPolicy: false
}))

app.use(
	csurf({
		cookie: {
			secure: isProduction,
			sameSite: isProduction && "Lax",
			httpOnly: true
		}
	})
)
//#endregion Security

app.use(routes);

//#region Error Handling
app.use((_req, _res, next) => { // 404
	const err = new Error("The requested resource couldn't be found.");
	err.title = "Resource Not Found";
	err.errors = ["The reqested resource couldn't be found."];
	err.status = 404;
	next(err);
})

app.use((err, _req, _res, next) => { // Sequelize
	if (err instanceof ValidationError) {
		err.errors = err.errors.map(e => e.message);
		err.title = "Validation error";
	}
	next(err);
})

app.use((err, _req, res, _next) => { // Error Formatter
	res.status(err.status || 500);
	console.error(err);
	res.json({
		title: err.title || "Server Error",
		message: err.message,
		errors: err.errors,
		stack: isProduction ? null : err.stack
	})
})
//#endregion Error Handling

module.exports = app;
