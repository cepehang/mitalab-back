const { Company, validate } = require('../models/company'); 
const { City } = require('../models/city');
const { Hospital } = require('../models/hospital');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const _ = require('lodash');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const companies = await Company.find().sort('name');
  res.send(companies);
});

router.post('/', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid city.');

  const company = new Company({
		... _.pick(req.body, ['name', 'phone', 'address', 'email', 'description', 'tags']),
		cityId: city._id,
  });
  await company.save();
  
  res.send(company);
});

router.put('/:id', [auth, admin], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const city = await City.findById(req.body.cityId);
  if (!city) return res.status(400).send('Invalid city.');

	// Validate all hospitals objectId
	const hospitalsN = await Hospital.find({ _id: { $in: req.body.hospitals	}}).countDocuments();
	if (req.body.hospitals && hospitalsN != req.body.hospitals.length) 
		return res.status(400).send('Invalid hospital.');

  const company = await Company.findByIdAndUpdate(req.params.id, {
		... _.pick(req.body, ['name', 'phone', 'address', 'email', 'description', 'tags', 'hospitals', 'vat']),
		city: city._id,
    }, { new: true });

  if (!company) return res.status(404).send('The company with the given ID was not found.');
  
  res.send(company);
});

router.delete('/:id', [auth, admin], async (req, res) => {
  const company = await Company.findByIdAndRemove(req.params.id);

  if (!company) return res.status(404).send('The company with the given ID was not found.');

  res.send(company);
});

router.get('/:id', async (req, res) => {
  const company = await Company.findById(req.params.id);

  if (!company) return res.status(404).send('The company with the given ID was not found.');

  res.send(company);
});

module.exports = router; 
