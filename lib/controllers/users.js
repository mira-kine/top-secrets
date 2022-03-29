const { Router } = require('express');
const User = require('../models/User');
const UserService = require('../services/UserService');
const ONE_DAY_IN_MS = 1000 * 60 * 60 * 24;

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
      const user = await {
        message: 'Signed in successfully',
        user: { id: '1', email: 'test@e.com' },
      };
      res.send(user);
    } catch (error) {
      next(error);
    }
  });
