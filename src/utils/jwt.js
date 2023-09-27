const jwt = require('jsonwebtoken');

const createError = require('http-errors');

const GlobalConfig = require('../config');

const appConfig = (new GlobalConfig()).getConfig();

const tokenOtions = { // **** OPTIONS FOR GENERATED TOKENS	
	algorithm: 'HS256',
	expiresIn: appConfig.RESET_TOKEN_EXPIRATION_SECONDS
};

const generateUserToken = async (userId, email) => {

	try {

		const payload = {
			userId,
			email 
		};	

		const token = await jwt.sign(payload, appConfig.TOKEN_SECRET_STRING, tokenOtions);

		return token
		
	} catch (error) {
		
		throw createError(500, 'Could Not Create the Token');
	}

}

const verifyUserToken = token => {

	try {
		
		const payload = jwt.verify(token, appConfig.TOKEN_SECRET_STRING, tokenOtions);

		if (!payload) throw createError(500, 'The Token is invalid or Expired!')

					
			const { userId, email } = payload;

			return {
				userId,
				email
      };

	} catch (error) {
		throw createError(500, error.message);
	}

}

module.exports = {
	generateUserToken,
	verifyUserToken
}
