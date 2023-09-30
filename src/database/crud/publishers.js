const createError = require('http-errors');

const Models = require('../models');

const GlobalConfig = require('../../config');

const appConfig = (new GlobalConfig()).getConfig();

const MAX_ITEMS_PER_PAGE = appConfig.MAX_ITEMS_PER_PAGE

const addPublisher = async (name) => {

	try {
		
		const newPublisher = await Models.Publisher.create({ name });

		return newPublisher.toObject();

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getAllPublishers = async (page, limit) => {
	
	try {

		const limitApplied = (limit && limit <= MAX_ITEMS_PER_PAGE) ? limit : MAX_ITEMS_PER_PAGE

		const paginateOptions = {
			page: page || 1,
			limit: limitApplied
		}
		
		const publishers = await Models.Publisher.paginate({}, paginateOptions);

		return publishers;

	} catch (error) {
		throw createError(error.status || 500, error.message);
	}

}

module.exports = {
	addPublisher,
	getAllPublishers
}