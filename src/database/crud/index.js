const bookOperations = require('./books')

const authorOperations = require('./authors')

module.exports = {
	book: bookOperations,
	author: authorOperations
}