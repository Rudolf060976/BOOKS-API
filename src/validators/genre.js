const Joi = require('joi')

const newGenre = Joi.object({
	name: Joi.string().max(50).required()
}).required();

module.exports = {
	newGenre
}