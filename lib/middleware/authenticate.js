const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // get the value from the jwt
    const { session } = req.cookies;
    // verify the jwt compares the signature
    const payload = jwt.verify(session, process.env.JWT_SECRET);
    // payload = req.user
    req.user = payload;
    next();
  } catch (error) {
    // set error message
    error.message = 'You must be signed in to continue';
    error.status = 401;
    next(error);
  }
};
