const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	phone: { 
		type: String, //TODO Check regex for vietnamese phone numbers
		required: true,
	},
	password: {
		type: String,
		required: true,
		minlength: 8,
		maxlength: 255,
	},
	hospitals: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hospital'
	}],
	isAdmin: {
		type: Boolean,
		default: false,
	},
	isActive: { 
		type: Boolean,
		default: true,
	},
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, process.env.JWT_KEY);
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().required(),
    password: Joi.string().min(8).max(255).required(),
		hospitals: Joi.array().items(Joi.objectId()),
		isAdmin: Joi.bool(),
  });

  return schema.validate(user);
}

exports.User = User; 
exports.validate = validateUser;
