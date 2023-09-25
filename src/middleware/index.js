const auth = require('./auth');

const joiValidationMiddleware = require('./joi');

const rateLimit = require('./rate_limit');

module.exports = {
	auth,
	joi: {
		joiValidationMiddleware
	},
	rateLimit
};