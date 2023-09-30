const crudOperations = require('../database/crud');
const moment = require('moment');
const addBook = async (req, res, next) => {
	
	const {
		isbn,
		title,
		chapters,
		pages,
		genre,
		authorIds,
		publishInfo,
		price
	} = req.body

	const newBook = await crudOperations.book.addBook({
		isbn,
		title,
		chapters,
		pages,
		genre,
		authorIds,
		publishInfo,
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

const getFilteredBooks = async (req, res, next) => {

	try {
		
		const { page, limit } = req.query;

		const { filter } = req.body;

		const books = await crudOperations.book.getFilteredBooks(filter, page, limit);

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
							books
					}
		});


	} catch (error) {
		next(error);
	}

}

const deleteBook = async (req, res, next) => {

	try {
		
		const { bookId } = req.params;

		await crudOperations.book.deleteBook(bookId);

		res.status(200).json({
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

module.exports = {
	addBook,
	getBooks,
	getBook,
	addAuthorsToBook,
	getBookAuthors,
	getFilteredBooks,
	deleteBook
}