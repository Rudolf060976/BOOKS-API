const createError = require('http-errors');
const crudOperations = require('../database/crud')


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

		const { page, limit } = req.query
		
		const allBooks = await crudOperations.book.getAllBooks(page, limit)

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