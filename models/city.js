const Joi = require('joi');
const mongoose = require('mongoose');

const City = mongoose.model('City', new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	postalCode: {
		type: String, //TODO Check correct implementation of postalCode
		required: true,
	},
	isActive: { 
		type: Boolean,
		default: true,
	},
}));

function validateCity(city) {
  const schema = Joi.object({
    name: Joi.string().required(),
    postalCode: Joi.string().required(),
  });

  return schema.validate(city);
}

exports.City = City; 
exports.validate = validateCity;
