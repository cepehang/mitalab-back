const { Reservation, validate } = require('../models/reservation'); 
const { Room } = require('../models/room'); 
const { User } = require('../models/user'); 
const auth = require('../middleware/auth');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {		
	//TODO Implement a proper permission system for queries
	//TODO Use momentjs to implement past & future reservations
  const reservations = await Reservation.find();
  res.send(reservations);
});

router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

  const room = await Room.findById(req.body.hospitalRoomId);
  if (!room) return res.status(400).send('Invalid room.');

  const reservation = new Reservation({
		userId: user._id,
		hospitalRoomId: room._id,
		//TODO Implement dates
  });
	await reservation.save();

	res.send(reservation);
});

router.put('/:id', auth, async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.body.userId);
  if (!user) return res.status(400).send('Invalid user.');

	// if (user._id != req.user._id) return res.status(404).send('Forbidden');

  const room = await Room.findById(req.body.hospitalRoomId);
  if (!room) return res.status(400).send('Invalid room.');

	const reservation = await Reservation.findByIdAndUpdate(req.params.id, {
		userId: user._id,
		hospitalRoomId: room._id,
	}, { new: true });

  if (!reservation) return res.status(404).send('The reservation with the given ID was not found.');
  
	res.send(reservation);
});

router.get('/:id', auth, async (req, res) => {
  const reservation = await Reservation.findById(req.params.id);

  if (!reservation) return res.status(404).send('The reservation with the given ID was not found.');

  res.send(reservation);
});

router.delete('/:id', auth, async (req, res) => {
  const reservation = await Reservation.findByIdAndRemove(req.params.id);

  if (!reservation) return res.status(404).send('The reservation with the given ID was not found.');

  res.send(reservation);
});

module.exports = router; 
