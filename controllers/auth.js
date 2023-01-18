const { BadRequestError, UnauthenticatedError } = require('../errors');
const { StatusCodes } = require('http-status-codes');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !password || !email) {
    throw new BadRequestError('Veuillez remplir tous les champs');
  }

  const isValidEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      email
    );

  if (!isValidEmail) {
    throw new BadRequestError('Veuillez entrer un email valide');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const {
    rows: [user]
  } = await db.query(
    'INSERT INTO users (name, email, password) VALUES($1, $2, $3) RETURNING *',
    [name, email, hashedPassword]
  );

  const token = jwt.sign(
    { userID: user.user_id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );

  res.status(StatusCodes.CREATED).send({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const {
    rows: [user]
  } = await db.query('SELECT * FROM users WHERE email = $1', [email]);

  if (!user) {
    throw new UnauthenticatedError('Identifiants incorrects');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Identifiants incorrects');
  }

  const token = jwt.sign(
    { userID: user.user_id, name: user.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  );

  res.status(StatusCodes.OK).send({ user: { name: user.name }, token });
};

module.exports = { login, register };
