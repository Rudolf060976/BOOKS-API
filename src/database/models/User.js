const mongoose = require('mongoose');

const bcrypt = require('bcryptjs');

const uniqueValidator = require('mongoose-unique-validator');

const mongoosePaginate = require('mongoose-paginate-v2');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
		trim: true,
		validate: {
			validator: function(v) {
				return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
			},
			message: props => `${props.value} is not a valid email!`
		}
	},
	password: {
		type: String,
		required: true,
		trim: true,
		minLength: 6,
		maxLength: 30
	},
	image: {
		type: String
	}
}, {
	toJSON: { virtuals: true },
	toObject: { virtuals: true },
	timestamps: true
})

userSchema.plugin(uniqueValidator);
userSchema.plugin(mongoosePaginate);

userSchema.pre('save', function(next) {

	const salt = bcrypt.genSaltSync(10);
	const hash = bcrypt.hashSync(this.password, salt);

	this.password = hash;

	next();
})

module.exports = mongoose.model('User', userSchema);