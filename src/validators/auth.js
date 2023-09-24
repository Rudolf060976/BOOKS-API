const Joi = require('joi');

const signup = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
	repeat_password: Joi.string().required().valid(Joi.ref('password'))  // Exactly equals to the password
}).required();

const login = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required()
}).required();


module.exports = {
	signup,
	login,
}