const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const publisherSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		maxLength: 50
	},
},{
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	timestamps: true
});

publisherSchema.plugin(uniqueValidator);
publisherSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Publisher', publisherSchema);
