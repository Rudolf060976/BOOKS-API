const crudOperations = require('../database/crud')

const addGenre = async (req, res, next) => {

	try {

		const { name } = req.body;

		const newGenre = await crudOperations.genres.addGenre(name);
		
		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				genre: newGenre
			}
		});

	} catch (error) {
		next(error);
	}

}

const getAllGenres = async (req, res, next) => {

	try {

		const { page, limit } = req.query;
		
		const genres = await crudOperations.genres.getAllGenres(page, limit);

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				genres
			}
		});

	} catch (error) {
		next(error);
	}

}

module.exports = {
	addGenre,
	getAllGenres
}