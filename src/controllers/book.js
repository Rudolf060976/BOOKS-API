const crudOperations = require('../database/crud');
const moment = require('moment');
const addBook = async (req, res, next) => {
	
	const {
		title,
		chapters,
		pages,
		authorIds,
		datePublished,
		price
	} = req.body

	const newBook = await crudOperations.book.addBook({
		title,
		chapters,
		pages,
		authorIds,
		datePublished,
		price
	})

	try {
		
		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							book: newBook
					}
		});


	} catch (error) {
		next(error);
	}

}

const getBooks = async (req, res, next) => {
	
	try {
    console.log('**** COOKIES *****', JSON.stringify(req.cookies, null, 2))
		console.log('***** SESSION *****', JSON.stringify(req.session, null, 2))

		const { page, limit } = req.query
		
		const allBooks = await crudOperations.book.getAllBooks(page, limit)
		
		// See https://expressjs.com/en/5x/api.html#res.cookie
		res.cookie('endpoints', {
			get: ['api/books/', 'api/books/:bookId', 'api/books/:bookId/authors'],
			post: ['/api/books/new', 'api/books/:bookId/authors']
		}, { httpOnly: true })

		res.cookie('server-time', moment.utc().format('HH:mm:ss'), { httpOnly: true })

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							books: allBooks
					}
		});



	} catch (error) {
		next(error);
	}

}

const getBook = async (req, res, next) => {

	try {
		
		const { bookId } = req.params

		const bookData = await crudOperations.book.getBook(bookId)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							book: bookData
					}
		});

	} catch (error) {
		next(error);
	}

}

const addAuthorsToBook = async (req, res, next) => {

	try {
		const { bookId } = req.params

		const { authorIds } = req.body

		await crudOperations.book.addAuthorsToABook(bookId, authorIds)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: null
		});


	} catch (error) {
		next(error);
	}

}

const getBookAuthors = async (req, res, next) => {

	try {
		
		const { bookId } = req.params

		const book = await crudOperations.book.getBook(bookId)

		const authors = await crudOperations.book.getBookAuthors(bookId)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				book,
				authors
			}
		});

	} catch (error) {
		next(error)
	}

}

module.exports = {
	addBook,
	getBooks,
	getBook,
	addAuthorsToBook,
	getBookAuthors
}