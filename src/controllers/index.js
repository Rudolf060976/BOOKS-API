const book = require('./book');

const author = require('./author');

const auth_session = require('./auth_session');

const auth = require('./auth');

module.exports = {
	book,
	author,
	auth_session: auth_session,
	auth
}