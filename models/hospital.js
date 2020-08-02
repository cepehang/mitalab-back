const Joi = require('joi');
const mongoose = require('mongoose');

const Hospital = mongoose.model('Hospital', new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'City',
		required: true,
	},
	companyId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Company',
		required: true,
	},
	phone: { 
		type: String, //TODO Check regex for vietnamese phone numbers
		// required: true,
	},
	address: {
		type: String, //TODO Check correct implementation of address
		required: true,
	},
	email: {
		type: String, //TODO Check JS regex for emails
		// required: true,
	},
	description: String,
	tags: [ String ], //TODO Implement a tag model if need be
	isActive: { 
		type: Boolean,
		default: true,
	},
}));

function validateHospital(hospital) {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.string().required(),
		cityId: Joi.objectId().required(),
		companyId: Joi.objectId().required(),
		email: Joi.string().email(),
		phone: Joi.string(),
		description: Joi.string(),
		tags: Joi.array().items(Joi.string()),
  });

  return schema.validate(hospital);
}

exports.Hospital = Hospital; 
exports.validate = validateHospital;
