const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAllSecrets();
      res.send(secrets);
    } catch (error) {
      next(error);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const secret = {
        id: '1',
        title: 'Bing Bong',
        description: 'Ayyo take me out to dinnah',
      };
      res.send(secret);
    } catch (error) {
      next(error);
    }
  });
