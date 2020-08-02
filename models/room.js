const Joi = require('joi');
const mongoose = require('mongoose');

const availableTimeSchema = new mongoose.Schema({
	day: {							//TODO implement proper days with moment.js
		type: String,
		enum: ['sunday','monday','tuesday','wednesday','thursday','friday', 'saturday'],
		required: true,		//TODO validate unicity of the days of the week
	},
	dayhours: [{				//TODO implement special days such as national holidays
		open: {						//TODO implement proper hours with moment.js
			type: Number,
			min: 0,
			max: 24 * 60,		//the number of minutes in a day
			required: true,
		},
		close: {
			type: Number,
			min: 0,
			max: 24 * 60,
			required: true,
		},
	}],
});

const operationSchema = new mongoose.Schema({
	name: { 
		type: String, 
		required: true 
	},
	tags: [ String ],
	availableTimes: {
		type: [ availableTimeSchema ],
		validate: {
			validator: function(times) { 
				const weekDays = times.map(({ day }) => day);
				return (new Set(array)).size !== weekDays.length; 
			},
			message: 'There are duplicate days in the calendar',
		},
	},
	duration: {
		type: Number, //in minutes
		default: 60,
	},
	price: {
		type: Number,
		min: 0,
		default: 0,
	}
});

const roomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	hospitalId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Hospital',
		required: true,
	},
	operations: { 
		type: [ operationSchema ],
	},
	description: String,
});

roomSchema.methods.findAvailableTimes = function() { //TODO
	//Query this room reservations
	//Take the default available times and substract the reservations
	return;
}

const Room = mongoose.model('Room', roomSchema);

function validateRoom(room) {
  const schema = Joi.object({
    name: Joi.string().required(),
    hospitalId: Joi.objectId().required(),
  });

  return schema.validate(room);
}

exports.Room = Room; 
exports.validate = validateRoom;
