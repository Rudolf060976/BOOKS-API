const Joi = require('joi')

const newAuthor = Joi.object({
	name: Joi.string().max(50).required()
})

const addBooksToAuthorParams = Joi.object({
	authorId: Joi.string().required()
}).required()

const addBooksToAuthorBody = Joi.object({
	bookIds: Joi.array().items(Joi.string()).required()
}).required()

module.exports = {
	newAuthor,
	addBooksToAuthorParams,
	addBooksToAuthorBody
}