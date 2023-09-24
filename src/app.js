const express = require ('express');

require('./config')

const connectDB = require('./database/mongoose')

const logger = require('morgan')

const nconf = require('nconf');

const createError = require('http-errors')

const path = require('path')

const bookRoutes = require('./routes/book')

const authorRoutes = require('./routes/author')


const config = nconf.get('APP')

const app = express();

app.use(express.json());

app.use(logger('dev'));

app.use('/api/books', bookRoutes);

app.use('/api/authors', authorRoutes);

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


connectDB().then(() => {

	app.listen(4000, () => {

		console.log('Server Ready and Listening on Port: ' + config.PORT );
	
	});

})

