const book = require('./book');

const author = require('./author');

const auth_session = require('./auth_session');

const auth = require('./auth');

const genre = require('./genre');

const publisher = require('./publisher');

module.exports = {
	book,
	author,
	auth_session: auth_session,
	auth,
	genre,
	publisher
}