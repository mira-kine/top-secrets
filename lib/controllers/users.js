const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
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
      const user = await UserService.signIn(req.body);
      res
        .cookie(process.env.COOKIE_NAME, user.authToken(), {
          httpOnly: true,
          maxAge: ONE_DAY_IN_MS,
        })
        .send({ message: 'Signed in successfully', user });
    } catch (error) {
      next(error);
    }
  })
  .get('/private', authenticate, (req, res, next) => {
    try {
      res.send({
        message: 'You can only see these secrets if you are signed in!',
      });
    } catch (error) {
      next(error);
    }
  })
  .delete('/sessions', async (req, res, next) => {
    res
      .clearCookie(process.env.COOKIE_NAME)
      .json({ success: true, message: 'Signed out successfully' });
  });
