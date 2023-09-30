const Joi = require('joi');

const newBook = Joi.object({
	isbn: Joi.string().max(20).required(),
	title: Joi.string().max(200).min(0).required(),
	chapters: Joi.number().required(),
	pages: Joi.number().required(),
	genre: Joi.string().required(),
	authorIds: Joi.array().items(Joi.string()),
	publishInfo: Joi.object({
		date: Joi.date().iso().required(),
		publisher: Joi.string().required(),
		edition: Joi.number().min(1).max(50).required()
	}).required(),
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

const deleteBook = Joi.object({
	bookId: Joi.string().required()
})

const getFilteredBooks = Joi.object({
	filter: Joi.object({
		isbn: Joi.string().max(20).optional,
		title: Joi.string().max(200).optional,		
		genre: Joi.string().max(100).optional,
		publisher: Joi.string().max(100).optional,
	})
}) 

module.exports = {
	newBook,
	getBook,
	addAuthorsToBookBody,
	addAuthorsToBookParams,
	getFilteredBooks,
	deleteBook
}