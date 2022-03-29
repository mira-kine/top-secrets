const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      email,
      passwordHash,
    });

    return user;
  }

  static async signIn({ email, password }) {
    // check for existing user
    const user = await User.findByEmail(email);
    if (!user) throw new Error('invalid email/password');
    // if user exists, compared hashed password
    const matchingPassword = bcrypt.compareSync(password, user.passwordHash);
    if (!matchingPassword) throw new Error('invalid email/password');
    // if passwords match, return user
    return user;
  }
};
