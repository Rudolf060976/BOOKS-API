const createError = require('http-errors');
const moment = require('moment');
const Models = require('../models');

const { Model, default: mongoose } = require('mongoose');

const GlobalConfig = require('../../config');

const appConfig = (new GlobalConfig()).getConfig();

const MAX_ITEMS_PER_PAGE = appConfig.MAX_ITEMS_PER_PAGE

const addBook = async (bookData) => {

	const session = await mongoose.startSession();

	try {

		session.startTransaction()
		
		const { title, chapters, pages, authorIds, datePublished, price } = bookData

		const newBook = await Models.Book.create([
			{
				title,
				chapters,
				pages,
				price: new mongoose.Types.Decimal128(String(price)),
				datePublished: moment.utc(datePublished).toDate()
			}], { session })

		const bookId = newBook._id

		if (authorIds && authorIds.length > 0) {

			await Models.AuthorBook.create(authorIds.map(authorId => { bookId, authorId }), { session })
			
		}
    await session.commitTransaction()
		session.endSession()
		return newBook[0].toObject()

	} catch (error) {
		await session.abortTransaction()
		throw createError(error.status || 500, error.message)
	}

}

const getAllBooks = async (page, limit) => {

	try {
		
		const limitApplied = (limit && limit <= MAX_ITEMS_PER_PAGE) ? limit : MAX_ITEMS_PER_PAGE

		//const books = await Models.Book.find();

		const paginateOptions = {
			page: page || 1,
			limit: limitApplied
		}

		const books = await Models.Book.paginate({}, paginateOptions);

		return books;
		
	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getBookAuthors = async (bookId) => {

	try {
		
		const authorsOfABook = await Models.AuthorBook.find({ bookId }).populate({ path: 'authorId'}).exec()

		return authorsOfABook

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const addAuthorsToABook = async (bookId, authorIds) => {
	try {

		// Check if there's a duplicated authorId

		const authorsFromBook = await Models.AuthorBook.find({ bookId })

		const authorsFromBookIds = authorsFromBook.map(doc => doc.authorId)
		
		if (authorsFromBookIds.some(id => authorIds.includes(id))) {
			throw createHttpError(409, 'Duplicated Author for Book')
		}

		await Models.AuthorBook.create(authorIds.map(authorId => ({ bookId, authorId })))

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getBook = async (bookId) => {

	try {
		
		const book = await Models.Book.findById(bookId)

		if (!book) throw createError(404, 'Book not Found')

		const { pages, chapters } = book

		const pagesPerChapter = chapters > 0 ? (pages / chapters).toFixed(2) : 0

		return {
			...book.toObject(),
			pagesPerChapter
		}

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

module.exports = {
	addBook,
	getAllBooks,
	getBookAuthors,
	addAuthorsToABook,
	getBook
}


