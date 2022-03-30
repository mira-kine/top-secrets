const { Router } = require('express');
const authenticate = require('../middleware/authenticate');

module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const secrets = [
      {
        id: '1',
        title: 'Bing Bong',
        description: 'Ayyo take me out to dinnah',
        created_at: '2022-03-30 00:43:12.723336+07',
      },
    ];
    res.send(secrets);
  } catch (error) {
    next(error);
  }
});
