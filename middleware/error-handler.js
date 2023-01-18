const { StatusCodes } = require('http-status-codes');

const erroHandlerMiddleware = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
};

module.exports = erroHandlerMiddleware;
