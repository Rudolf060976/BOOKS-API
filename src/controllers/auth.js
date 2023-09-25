const jwt = require('jsonwebtoken');
const utils = require('../utils');
const crudOperations = require('../database/crud');
const bcrypt = require('bcryptjs');

const resetPasswordGet = async (req, res, next) => {

	try {
		
		const { email } = req.body;

		const user = await crudOperations.user.getUserByEmail(email);

		const { id } = user;

		const token = await utils.jwt.generateUserToken(id, email)

		await crudOperations.user.storeUserResetToken(id, token);

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				user: {
					id,
					email
				},
				token
			}
		});

	} catch (error) {
		next(error);
	}

}

const resetPasswordPost = async (req, res, next) => {

	try {

		const { token, password } = req.body;

		const payload = utils.jwt.verifyUserToken(token);

		const { userId } = payload;

		const salt = bcrypt.genSaltSync(10);
		
		const hash = bcrypt.hashSync(password, salt);
		
		const user = await crudOperations.user.updateUserResetPassword(userId, hash);

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				user
			}
		});
		
	} catch (error) {
		next(error);
	}

}

module.exports = {
	resetPasswordGet,
	resetPasswordPost
}