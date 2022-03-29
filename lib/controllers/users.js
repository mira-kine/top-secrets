const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = {
      id: '1',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
    };
    res.send(user);
  } catch (error) {
    next(error);
  }
});
