const Joi = require('joi')

const newPublisher = Joi.object({
	name: Joi.string().max(50).required()
}).required();

module.exports = {
	newPublisher
}