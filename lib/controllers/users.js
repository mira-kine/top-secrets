const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/sessions', async (req, res, next) => {
    try {
      const user = await { email: 'test@e.com', password: 'asdfg' };
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
