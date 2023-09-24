
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const bookSchema = new Schema({    
    title: {
        type: String,
        required: true,
    },
    chapters: {
        type: Number,
        required: true,
				min: 1 
    },
		pages: {
			type: Number,
			required: true 
		},
		datePublished: {
			type: Date,
			required: true
		},
		price: {
			type: Schema.Types.Decimal128,
			required: true
		}
},{
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	timestamps: true
});

bookSchema.plugin(uniqueValidator);
bookSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Book', bookSchema);