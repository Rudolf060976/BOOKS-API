const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')

router.get('/',
	controllers.auth_session.isAuthenticated
)

router.post('/login',
	joiValidationMiddleware(validators.auth.login, 'body'),
	controllers.auth_session.login
)

router.post('/signup',
	joiValidationMiddleware(validators.auth.signup, 'body'),
	controllers.auth_session.signup
)

router.post('/logout',
 controllers.auth_session.logout
)

module.exports = router;