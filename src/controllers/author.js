const crudOperations = require('../database/crud')


const addAuthor = async (req, res, next) => {
	try {
		
		const { name } = req.body

		const newAuthor = await crudOperations.author.addAuthor({  name })

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				author: newAuthor
			}
		});

	} catch (error) {
		next(error)
	}
}

const getAllAuthors = async (req, res, next) => {
	try {

		const { page, limit } = req.query
		
		const authors = await crudOperations.author.getAllAuthors(page, limit)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				authors
			}
		});

	} catch (error) {
		next(error)
	}
}

const addBooksToAuthor = async (req, res, next) => {
	try {
		
		const { authorId } = req.params

		const { bookIds } = req.body

		await crudOperations.author.addBooksToAuthor(authorId, bookIds)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: null
		});

	} catch (error) {
		next(error)
	}
}

const getAuthorBooks = async (req, res, next) => {
	try {
		
		const { authorId } = req.params

		const author = await crudOperations.author.getAuthor(authorId)

		const books = await crudOperations.author.getAuthorBooks(authorId)

		res.status(201).json({
			error: null,
			ok: true,
			status: 200,
			message: 'Success',
			data: {
				author,
				books
			}
		});
		
	} catch (error) {
		next(error)
	}
}

module.exports = {
	addAuthor,
	getAllAuthors,
	addBooksToAuthor,
	getAuthorBooks
}