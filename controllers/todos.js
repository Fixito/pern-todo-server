const db = require('../db');
const { BadRequestError, NotFoundError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const createTodo = async (req, res) => {
  const { name } = req.body;
  const { userID } = req.user;

  if (!name) {
    throw new BadRequestError('Veuillez remplir tous les champs');
  }

  const {
    rows: [todo]
  } = await db.query(
    'INSERT INTO todos (name, user_id) VALUES($1, $2) RETURNING *',
    [name, userID]
  );

  res.status(StatusCodes.CREATED).send({ todo });
};

const getAllTodos = async (req, res) => {
  const { userID } = req.user;

  const { rows: todos } = await db.query(
    'SELECT * FROM todos WHERE user_id = $1',
    [userID]
  );

  res.status(StatusCodes.OK).send({ todos, count: todos.length });
};

const upDateTodo = async (req, res) => {
  const { name } = req.body;
  const { id: todoID } = req.params;

  if (!name) {
    throw new BadRequestError('Veuillez remplir tous les champs');
  }

  const {
    rows: [todo]
  } = await db.query(
    'UPDATE todos SET name = $1 WHERE todo_id = $2 RETURNING *',
    [name, todoID]
  );

  if (!todo) {
    throw new NotFoundError(`Pas de tâche avec l'id ${todoID}`);
  }

  res.status(StatusCodes.OK).send({ todo });
};

const deleteTodo = async (req, res) => {
  const { id: todoID } = req.params;

  const {
    rows: [todo]
  } = await db.query('DELETE FROM todos WHERE todo_id = $1 RETURNING *', [
    todoID
  ]);

  if (!todo) {
    throw new NotFoundError(`Pas de tâche avec l'id ${todoID}`);
  }

  res.status(StatusCodes.OK).send({ todo });
};

const clearTodos = async (req, res) => {
  const { userID } = req.user;

  const { rows: todos } = await db.query(
    'DELETE FROM todos WHERE user_id = $1 RETURNING *',
    [userID]
  );

  res.status(StatusCodes.OK).send({ todos });
};

module.exports = {
  createTodo,
  getAllTodos,
  upDateTodo,
  deleteTodo,
  clearTodos
};
