const createError = require('http-errors')
const Models = require('../models')

const GlobalConfig = require('../../config');

const appConfig = (new GlobalConfig()).getConfig();

const MAX_ITEMS_PER_PAGE = appConfig.MAX_ITEMS_PER_PAGE

const addAuthor = async (authorData) => {

	try {

		const { name } = authorData
		
		const newAuthor = await Models.Author.create({ name })

		return newAuthor

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getAuthor = async (authorId) => {

	try {
		
		const author = await Models.Author.findById(authorId)

		return author.toObject()

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}
}

const getAllAuthors = async (page, limit) => {

	try {
		
		// const allAuthors = await Models.Author.find()

		const limitApplied = (limit && limit <= MAX_ITEMS_PER_PAGE) ? limit : MAX_ITEMS_PER_PAGE

		const paginateOptions = {
			page: page || 1,
			limit: limitApplied
		}

		const authors = await Models.Author.paginate({}, paginateOptions);

		return authors;

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const addBooksToAuthor = async (authorId, bookIds) => {

	try {

		// Get all author's bookIds first

		const booksFromAuthor = await Models.AuthorBook.find({ authorId })

		const booksFromAuthorIds = booksFromAuthor.map(doc => doc.bookId)

		if (booksFromAuthorIds.some(id => bookIds.includes(id))) {
			throw createHttpError(409, 'Duplicated book for Author')
		}

		await Models.AuthorBook.create(bookIds.map(bookId => ({ authorId, bookId })))
		
	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getAuthorBooks = async (authorId) => {

	try {
		
		const books = await Models.AuthorBook.find({ authorId }).populate({ path: 'bookId'}).exec()

		return books

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

module.exports = {
	addAuthor,
	getAllAuthors,
	addBooksToAuthor,
	getAuthorBooks,
	getAuthor
}