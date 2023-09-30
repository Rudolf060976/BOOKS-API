
const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const bookSchema = new Schema({  
		isbn: {
			type: String,
			required: true,
			maxLength: 20
		}, 
    title: {
        type: String,
        required: true,
				maxLength: 200,
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
		genre: {
			type: mongoose.Types.ObjectId,
			ref: 'Genre',
			required: true
		},
		publishInfo: {
			date: {
				type: Date,
				required: true
			},
			publisher: {
				type: mongoose.Types.ObjectId,
				ref: 'Publisher',
				required: true
			},
			edition: {
				type: Number,
				default: 1
			}
		},		
		price: {
			type: Schema.Types.Decimal128,
			required: true
		},
		isRemovable: {
			type: Boolean,
			default: false
		}
},{
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	timestamps: true
});

bookSchema.plugin(uniqueValidator);
bookSchema.plugin(mongoosePaginate);


module.exports = mongoose.model('Book', bookSchema);