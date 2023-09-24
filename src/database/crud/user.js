const createError = require('http-errors');
const Models = require('../models');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs');

const addUser = async (email, password) => {
	
	try {

		// Check if user exists

		const existingUser = await Models.User.findOne({ email });

		if (existingUser) {
			throw createError(409, 'Duplicated Email!')
		}

		const newUser = await Models.User.create({
			email,
			password
		});

	return newUser.toObject();
		

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getUser = async (userId) => {
	
	try {

		// Check if it's a valid Id

		const isValid = mongoose.Types.ObjectId.isValid(userId);

		if (!isValid) {
			throw createError(400, 'Invalid User Id!')
		}

		const user = await Models.User.findById(userId);

		return user.toObject();
		
	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const verifyUser = async (email, password) => {

	try {

		const user = await Models.User.findOne({ email });

		if (!user) {
			throw createError(404, 'Email not Found!')
		}

		const isValid = bcrypt.compareSync(password, user.password)

		if (!isValid) {
			throw createError(401, 'Incorrect Password!')
		}

		return user.toObject();
		
	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

module.exports = {
	addUser,
	getUser,
	verifyUser
}