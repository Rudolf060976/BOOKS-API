const { rateLimit } = require('express-rate-limit')

const GlobalConfig = require('../config');

const appConfig = (new GlobalConfig()).getConfig();

const rateLimiter = rateLimit({
	windowMs: appConfig.RATE_LIMIT_WINDOW_SECONDS * 1000, // time Window in seconds
	limit: async (req, res) => {
		/*
			Authenticated users will have a different Rate Limit from Anonymous Users
		*/
		const isAuthenticated = !!req.session?.user;

		if (isAuthenticated) return appConfig.AUTH_USERS_RATE_LIMIT;

		return appConfig.ANONYMOUS_USERS_RATE_LIMIT
	},
	standardHeaders: 'draft-6',
	keyGenerator: (req, res) => {
		const isAuthenticated = !!req.session?.user;

		if (isAuthenticated) return req.session.user.id;

		return req.ip;

	},
	handler: (req, res, next, options) => {

		res.status(options.statusCode).json({
			error: 'Too many requests, please try again later.',
			ok: false,
			status: options.statusCode,
			message: 'Too many requests, please try again later.',
			data: null
		});

	}
});

module.exports = {
	rateLimiter
}