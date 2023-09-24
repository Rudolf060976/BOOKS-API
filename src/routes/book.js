
const express = require('express');

const router = express.Router();

const validators = require('../validators');

const joiValidationMiddleware = require('../middleware/joi');

const controllers = require('../controllers')


router.get('/',	
	joiValidationMiddleware(validators.shared.pageValidator, 'query'),  
	controllers.book.getBooks
);

router.get('/:bookId',
	joiValidationMiddleware(validators.book.getBook, 'params'),
	controllers.book.getBook
);

router.get('/:bookId/authors',
	joiValidationMiddleware(validators.book.getBook, 'params'),
	controllers.book.getBookAuthors
)

router.post('/new',		
	joiValidationMiddleware(validators.book.newBook, 'body'),
	controllers.book.addBook
)

router.post('/:bookId/authors',
	joiValidationMiddleware(validators.book.addAuthorsToBookParams, 'params'),
	joiValidationMiddleware(validators.book.addAuthorsToBookBody, 'body'),
	controllers.book.addAuthorsToBook
)


module.exports = router;