const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authenticateUser = async (req, res, next) => {
  try {

    const token = req.header('Authorization').replace('Bearer ', '');

    const decoded = jwt.verify(token, User.jwtSecretKey);

    const user = await User.findByUsername(decoded.username);
    delete user.password;

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;

    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

module.exports = authenticateUser;
