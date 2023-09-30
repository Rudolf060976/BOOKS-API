const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')

router.get('/',
	joiValidationMiddleware(validators.shared.pageValidator, 'query'),
	controllers.genre.getAllGenres
)

router.post('/new',
	joiValidationMiddleware(validators.genre.newGenre, 'body'),
	controllers.genre.addGenre
)

module.exports = router;

