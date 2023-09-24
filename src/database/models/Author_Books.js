const mongoose = require('mongoose')

const Schema = mongoose.Schema


const authorBookSchema = new Schema({
	authorId: {
		type: Schema.Types.ObjectId,
		ref: 'Author',
		required: true
	},
	bookId: {
		type: Schema.Types.ObjectId,
		ref: 'Book',
		required: true
	}
})

module.exports = mongoose.model('AuthorBook', authorBookSchema)
