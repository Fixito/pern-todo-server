const { UnauthenticatedError } = require('../errors');
const jwt = require('jsonwebtoken');

const authenticateUSer = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentification incorrect');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      userID: payload.userID,
      name: payload.name
    };

    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentification incorrect');
  }
};

module.exports = authenticateUSer;
