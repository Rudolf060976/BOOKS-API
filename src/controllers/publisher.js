const crudOperations = require('../database/crud')

const addPublisher = async (req, res, next) => {

	try {

		const { name } = req.body;

		const newPublisher = await crudOperations.publishers.addPublisher(name);
		
		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				publisher: newPublisher
			}
		});

	} catch (error) {
		next(error);
	}

}

const getAllPublishers = async (req, res, next) => {

	try {
		
		const publishers = await crudOperations.publishers.getAllPublishers();

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				publishers
			}
		});

	} catch (error) {
		next(error);
	}

}

module.exports = {
	addPublisher,
	getAllPublishers
}