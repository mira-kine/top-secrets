const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');

module.exports = Router()
  .post('/signup', async (req, res, next) => {
    try {
      const user = await UserService.create(req.body);
      res.send(user);
    } catch (error) {
      next(error);
    }
  })
  .post('/signin', async (req, res, next) => {
    try {
      const user = await { email: 'test@example.com', password: 'asdfg' };
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
