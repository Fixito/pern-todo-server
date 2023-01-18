const db = require('../db');

const login = async (req, res) => {
  res.send('Connexion');
};

const register = async (req, res) => {
  res.send('Inscription');
};

module.exports = { login, register };
