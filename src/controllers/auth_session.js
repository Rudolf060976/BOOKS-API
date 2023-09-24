const crudOperations = require('../database/crud');

const signup = async (req, res, next) => {

	try {

		const { email, password } = req.body

		const newUser = await crudOperations.user.addUser(email, password);

		req.session.user = {
			id: newUser._id,
			email: newUser.email
		}

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							user: req.session.user
			}
		});
		
	} catch (error) {
		next(error);
	}

}

const login = async (req, res, next) => {

	try {

		const { email, password } = req.body

		const user = await crudOperations.user.verifyUser(email, password);

		req.session.user = {
			id: user._id,
			email: user.email
		}
		
		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							user: req.session.user
			}
		});


	} catch (error) {
		next(error);
	}

}

const logout = async (req, res, next) => {

	await req.session.destroy()

	res.status(201).json({
		error: null,
		ok: true,
		status: 200,
		message: 'Success',
		data: null
	});
}

const isAuthenticated = async (req, res, next) => {

	const isAuthenticated = !!req.session.user;

	res.status(201).json({
		error: null,
		ok: true,
		status: 200,
		message: 'Success',
		data: {
			isAuthenticated
		}
	});

}

module.exports = {
	login,
	signup,
	logout,
	isAuthenticated
}