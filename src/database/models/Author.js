const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = mongoose.Schema;

const authorSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
}, {
	timestamps: true
});

authorSchema.plugin(uniqueValidator);

authorSchema.plugin(mongoosePaginate)


module.exports = mongoose.model('Author', authorSchema);