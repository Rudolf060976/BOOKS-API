const createError = require('http-errors');

const Models = require('../models');

const GlobalConfig = require('../../config');

const appConfig = (new GlobalConfig()).getConfig();

const MAX_ITEMS_PER_PAGE = appConfig.MAX_ITEMS_PER_PAGE

const addGenre = async (name) => {

	try {
		
		const newGenre = await Models.Genre.create({ name });

		return newGenre.toObject();

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getAllGenres = async (page, limit) => {
	
	try {

		const limitApplied = (limit && limit <= MAX_ITEMS_PER_PAGE) ? limit : MAX_ITEMS_PER_PAGE

		const paginateOptions = {
			page: page || 1,
			limit: limitApplied
		}
		
		const genres = await Models.Genre.paginate({}, paginateOptions);

		return genres;

	} catch (error) {
		throw createError(error.status || 500, error.message);
	}

}

module.exports = {
	addGenre,
	getAllGenres
}