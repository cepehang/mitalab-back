const Joi = require('joi');
const mongoose = require('mongoose');

const Reservation = mongoose.model('Reservation', new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	hospitalRoomId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Room',
		required: true,
	},
	startDate: {
		type: Date,
		// required: true,
	},
	endDate: {
		type: Date,
		// required: true,
	},
	lastUpdated: { //TODO Log the modifications
		type: Date,
		default: Date.now,
	},
	discountPercentage: {
		type: Number,
		default: 0,
	},
	discountAbsolute: {
		type: Number,
		default: 0,
	},
	price: {
		type: Number,
		default: 0,
	},
	isActive: { 
		type: Boolean,
		default: true,
	},
}));

function validateReservation(reservation) {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    hospitalRoomId: Joi.objectId().required(),
		//TODO Validate and require date
  }).unknown(true);

  return schema.validate(reservation);
}

exports.Reservation = Reservation; 
exports.validate = validateReservation;
