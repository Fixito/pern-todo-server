const { StatusCodes } = require('http-status-codes');

const erroHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg:
      err.message ||
      "Quelque chose s'est mal passé,  veuillez réessayer plus tard"
  };

  if (err?.code === '23505') {
    customError.msg = "L'adresse email existe déjà";
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }

  res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = erroHandlerMiddleware;
