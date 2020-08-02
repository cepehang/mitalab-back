const express = require('express');
const auth = require('../routes/auth');
const companies = require('../routes/companies');
const hospitals = require('../routes/hospitals');
const reservations = require('../routes/reservations');
const rooms = require('../routes/rooms');
const users = require('../routes/users');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/auth', auth);
  app.use('/api/companies', companies);
  app.use('/api/hospitals', hospitals);
  app.use('/api/reservations', reservations);
  app.use('/api/rooms', rooms);
  app.use('/api/users', users);
}
