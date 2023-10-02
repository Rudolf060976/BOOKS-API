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

		const { page, limit } = req.query
		
		const publishers = await crudOperations.publishers.getAllPublishers(page, limit);

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