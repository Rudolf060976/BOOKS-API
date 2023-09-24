const Joi = require('joi');

const newBook = Joi.object({
	title: Joi.string().max(200).min(0).required(),
	chapters: Joi.number().required(),
	pages: Joi.number().required(),
	authorIds: Joi.array().items(Joi.string()),
	datePublished: Joi.date().iso().required(),
	price: Joi.number().required()
}).required();

const getBook = Joi.object({
	bookId: Joi.string().required()
}).required()

const addAuthorsToBookParams = Joi.object({
	bookId: Joi.string().required()
}).required()

const addAuthorsToBookBody = Joi.object({
	authorIds: Joi.array().items(Joi.string()).required()
}).required()

module.exports = {
	newBook,
	getBook,
	addAuthorsToBookBody,
	addAuthorsToBookParams
}