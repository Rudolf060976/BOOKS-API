const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')

router.get('/',
	joiValidationMiddleware(validators.shared.pageValidator, 'query'),
	controllers.publisher.getAllPublishers
)

router.post('/new',
	joiValidationMiddleware(validators.publisher.newPublisher, 'body'),
	controllers.publisher.addPublisher
)

module.exports = router;
