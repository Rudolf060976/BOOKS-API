const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')

router.get('/resetPassword',
	joiValidationMiddleware(validators.auth.resetPasswordGet, 'body'),
	controllers.auth.resetPasswordGet
)

router.post('/resetPassword',
	joiValidationMiddleware(validators.auth.resetPasswordPost, 'body'),
	controllers.auth.resetPasswordPost
)

module.exports = router;