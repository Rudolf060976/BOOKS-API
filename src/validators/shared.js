const Joi = require('joi');

const pageValidator = Joi.object({
	page: Joi.number().max(500).min(1).optional(),
	limit: Joi.number().max(100).min(1).optional()
})

module.exports = {
	pageValidator
}