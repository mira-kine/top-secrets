const { Router } = require('express');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const user = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'asdfg',
    };
    res.send(user);
  } catch (error) {
    next(error);
  }
});
