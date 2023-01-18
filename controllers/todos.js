const db = require('../db');

const createTodo = async (req, res) => {
  res.send('Crée une tâche');
};

const getAllTodos = async (req, res) => {
  console.log(req.user);
  res.send('Récupère toutes les tâches');
};

const upDateTodo = async (req, res) => {
  res.send('Met à jour une tâche');
};

const deleteTodo = async (req, res) => {
  res.send('Supprime une tâche');
};

module.exports = { createTodo, getAllTodos, upDateTodo, deleteTodo };
