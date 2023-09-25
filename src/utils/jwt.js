const jwt = require('jsonwebtoken');

const createError = require('http-errors');

const nconf = require('nconf');

const config = nconf.get('APP');

const tokenOtions = { // **** OPTIONS FOR GENERATED TOKENS	
	algorithm: 'HS256',
	expiresIn: config.RESET_TOKEN_EXPIRATION_SECONDS
};

const generateUserToken = async (userId, email) => {

	try {

		const payload = {
			userId,
			email 
		};	

		const token = await jwt.sign(payload, config.TOKEN_SECRET_STRING, tokenOtions);

		return token
		
	} catch (error) {
		
		throw createError(500, 'Could Not Create the Token');
	}

}

const verifyUserToken = token => {

	try {
		
		const payload = jwt.verify(token, config.TOKEN_SECRET_STRING, tokenOtions);

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
