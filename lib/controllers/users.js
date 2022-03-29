const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router().post('/', async (req, res, next) => {
  console.log('req.body', req.body);
  try {
    const user = await UserService.create(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});
