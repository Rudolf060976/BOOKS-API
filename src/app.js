const express = require ('express');

const logger = require('morgan');

const cookieParser = require('cookie-parser');

const session = require('express-session'); // Only required for Session-oriented Auth

const MongoStore = require('connect-mongo'); // Only required for Session-oriented Auth

const createError = require('http-errors');

const path = require('path');


const GlobalConfig = require('./config');

const globalConfig = new GlobalConfig();


globalConfig.loadConfig().then(() => {

	const appConfig = globalConfig.getConfig()
	
	const bookRoutes = require('./routes/book');

	const authorRoutes = require('./routes/author');

	const authSessionRoutes = require('./routes/auth_session');

	const sharedAuthRoutes = require('./routes/auth');

	const rateLimiter = require('./middleware').rateLimit.rateLimiter;
	
	/* Will Implement two kinds of Authentication Flows for this project:

		1. Using Sessions (Typically used for Full Stack Apps)
			- Sessions will be stored in MongoDB

		2. Using JWT Tokens (Typically used by APIs)
			
		We'll be able to Switch between Auth Flows in the appConfig.json file.
	*/
	
	const app = express();

	app.use(express.json());

	app.use(logger('dev'));

	app.use(cookieParser(appConfig.COOKIES_SECRET_STRING)); // Should be the same secret used in session

	// See: https://expressjs.com/en/resources/middleware/session.html
	app.use(session({
		secret: appConfig.COOKIES_SECRET_STRING,
		store: MongoStore.create({   // See: https://www.npmjs.com/package/connect-mongo
			mongoUrl: appConfig.MONGODB_URI
		}),
		resave: false,
		saveUninitialized: false
	}))

	app.use(rateLimiter);

	app.use('/api/books', bookRoutes);

	app.use('/api/authors', authorRoutes);

	app.use('/api/auth/session/', authSessionRoutes);

	app.use('/api/auth', sharedAuthRoutes);

	// CATCH ALL ROUTE
	app.all('/api/*', (req, res, next) => {

		throw createError(404, "Route not found");

	});

	// SPA Frontend Served Index.html file
	app.all('*', (req, res, next) => {
			
		res.sendFile(path.join(process.cwd(),'public','index.html'));

	});

	// Error handler

	app.use((err, req, res, next) => {

		
		// when you add a custom error handler, you must delegate to the default Express error handler, when the headers have already been sent to the client:
		if (res.headersSent) {
				return next(err)
		}

		return res.status(err.status || 500).json({
		error: createError(err.status || 500, err.message),
		ok: false,
		status: err.status,
		message: 'ERROR: ' + err.message,
		data: null
	});

	});
	
	app.listen(appConfig.PORT, () => {

		console.log('Server Ready and Listening on Port: ' + appConfig.PORT );
	
	});

});








