const auth = require('./auth');

const joiValidationMiddleware = require('./joi');

module.exports = {
	auth,
	joi: {
		joiValidationMiddleware
	}
};