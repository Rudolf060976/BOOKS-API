const createError = require('http-errors');

const isAuthenticated_session = async (req, res, next) => {

	try {

		if (!req.session.user) {

			throw createError(401, 'Authentication Required!');
	
		}
	
		next()
		
	} catch (error) {
		next(error)
	}

} 


module.exports = {
	isAuthenticated_session
}