const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const Secret = require('../models/Secret');

module.exports = Router()
  .post('/create', authenticate, async (req, res, next) => {
    try {
      const secret = await Secret.createSecret({
        title: req.body.title,
        description: req.body.description,
      });
      res.send(secret);
    } catch (error) {
      next(error);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const secrets = await Secret.getAllSecrets();
      res.send(secrets);
    } catch (error) {
      next(error);
    }
  });
