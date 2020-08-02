const { Hospital, validate } = require('../models/hospital'); 
const { City } = require('../models/city');
const { Company } = require('../models/company');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin')
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const hospitals = await Hospital.find().sort('name');
  res.send(hospitals);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid city.');

  const company = await Company.findById(req.body.companyId);
  if (!company) return res.status(400).send('Invalid company.');

  const hospital = new Hospital({
		... _.pick(req.body, ['name', 'phone', 'address', 'email', 'description', 'tags']),
		cityId: city._id,
		companyId: company._id,
  });
  await hospital.save();
  
  res.send(hospital);
});

router.put('/:id', [auth, admin], async (req, res) => {
	const { error } = validate(req.body); 
	if (error) return res.status(400).send(error.details[0].message);

	const city = await City.findById(req.body.cityId);
	if (!city) return res.status(400).send('Invalid city.');

	const hospital = await Hospital.findByIdAndUpdate(req.params.id, {
		... _.pick(req.body, ['name', 'phone', 'address', 'email', 'description', 'tags']),
		cityId: city._id,
		companyId: company._id,
	}, { new: true });

	if (!hospital) return res.status(404).send('The hospital with the given ID was not found.');

	res.send(hospital);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const hospital = await Hospital.findByIdAndRemove(req.params.id);

  if (!hospital) return res.status(404).send('The hospital with the given ID was not found.');

  res.send(hospital);
});

router.get('/:id', async (req, res) => {
  const hospital = await Hospital.findById(req.params.id);

  if (!hospital) return res.status(404).send('The hospital with the given ID was not found.');

  res.send(hospital);
});

module.exports = router; 
