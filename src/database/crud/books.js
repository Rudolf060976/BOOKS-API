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
		
		const { isbn, title, chapters, pages, genre, authorIds, publishInfo, price } = bookData

		const {
			date,
			publisher,
			edition
		} = publishInfo;

		const newBook = await Models.Book.create([
			{
				isbn,
				title,
				chapters,
				pages,
				genre,
				publishInfo: {
					date: moment.utc(date).toDate(),
					publisher,
					edition
				},
				price: new mongoose.Types.Decimal128(String(price))
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
			limit: limitApplied,
			populate: ['genre', 'publishInfo.publisher']
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
		
		return book.toObject();

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const getFilteredBooks = async (filter, page, limit) => {

	try {

		const limitApplied = (limit && limit <= MAX_ITEMS_PER_PAGE) ? limit : MAX_ITEMS_PER_PAGE
		
		const paginateOptions = {
			page: page || 1,
			limit: limitApplied
		}

		const {
			isbn,
			title,
			genre,
			publisher
		} = filter;

		const filterToApply = {
			...(isbn && { isbn }),
			...(title && { title: /title/i }),
			...(genre && { genre }),
			...(publisher && { publisher })
		}
		
		const books = await Models.Book.paginate(filterToApply, paginateOptions);
		
		return books;

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

const deleteBook = async (bookId) => {

	try {

		const book = await Models.Book.findById(bookId).exec();

		if (!book.isRemovable) {
			throw createError(403, 'Can`t delete default books!')
		}
				
		await Models.Book.findByIdAndDelete(bookId);

	} catch (error) {
		throw createError(error.status || 500, error.message)
	}

}

module.exports = {
	addBook,
	getAllBooks,
	getBookAuthors,
	addAuthorsToABook,
	getBook,
	getFilteredBooks,
	deleteBook
}


