const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')

router.get('/',	
	joiValidationMiddleware(validators.shared.pageValidator, 'query'),
	controllers.author.getAllAuthors
)

router.get('/:authorId/books',
	joiValidationMiddleware(validators.author.addBooksToAuthorParams, 'params'),
	controllers.author.getAuthorBooks
)

router.post('/new',	
	joiValidationMiddleware(validators.author.newAuthor, 'body'),
	controllers.author.addAuthor
)

router.post('/:authorId/books',
	joiValidationMiddleware(validators.author.addBooksToAuthorParams, 'params'),
	joiValidationMiddleware(validators.author.addBooksToAuthorBody, 'body'),
	controllers.author.addBooksToAuthor
)



module.exports = router