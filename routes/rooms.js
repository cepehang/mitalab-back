const { Room, validate } = require('../models/room'); 
const { Hospital } = require('../models/hospital');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.send(rooms);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const hospital = await Hospital.findById(req.body.hospitalId);
  if (!hospital) return res.status(400).send('Invalid hospital.');

  const room = new Room({
		name: req.body.name,
		hospitalId: hospital._id,
  });
  await room.save();
  
  res.send(room);
});

// TODO Properly implement the dates first
// router.put('/:id', async (req, res) => {
//   const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

//   const city = await City.findById(req.body.cityId);
//   if (!city) return res.status(400).send('Invalid city.');

// 	// Validate all hospitals objectId
// 	const hospitalsN = await Hospital.find({ _id: { $in: req.body.hospitals	}}).countDocuments();
// 	if (hospitalsN != req.body.hospitals.length) return res.status(400).send('Invalid hospital.');

//   const room = await Room.findByIdAndUpdate(req.params.id, {
// 		... _.pick(req.body, ['name', 'phone', 'address', 'email', 'description', 'tags', 'hospitals', 'vat']),
// 		city: city._id,
// 		room: room._id,
//     }, { new: true });

//   if (!room) return res.status(404).send('The room with the given ID was not found.');
  
//   res.send(room);
// });

router.delete('/:id', [auth, admin], async (req, res) => {
  const room = await Room.findByIdAndRemove(req.params.id);

  if (!room) return res.status(404).send('The room with the given ID was not found.');

  res.send(room);
});

router.get('/:id', [auth, admin], async (req, res) => {
  const room = await Room.findById(req.params.id);

  if (!room) return res.status(404).send('The room with the given ID was not found.');

  res.send(room);
});

module.exports = router; 
