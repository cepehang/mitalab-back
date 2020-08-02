const Joi = require('joi');
const mongoose = require('mongoose');

const Company = mongoose.model('Company', new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	cityId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'City',
		required: true,
	},
	phone: { 
		type: String, //TODO Check regex for vietnamese phone numbers
		required: true,
	},
	address: {
		type: String, //TODO Check correct implementation of adress
		required: true,
	},
	email: {
		type: String, //TODO Check JS regex for emails
		required: true,
	},
	hospitals: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hospital'
	}],
	description: String,
	tags: [ String ],
	vat: {
		type: Number,
		default: 0,
	},
	isActive: { 
		type: Boolean,
		default: true,
	},
}));

function validateCompany(company) {
  const schema = Joi.object({
    name: Joi.string().required(),
    phone: Joi.string().required(),
    email: Joi.string().required().email(),
    address: Joi.string().required(),
		cityId: Joi.objectId().required(),
		hospitals: Joi.array().items(Joi.objectId()),
		description: Joi.string(),
		tags: Joi.array().items(Joi.string()),
		vat: Joi.number(),
  });

  return schema.validate(company);
}

exports.Company = Company; 
exports.validate = validateCompany;
