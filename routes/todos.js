const express = require('express');
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  upDateTodo,
  deleteTodo,
  clearTodos
} = require('../controllers/todos.js');

router.route('/').get(getAllTodos).post(createTodo).delete(clearTodos);
router.route('/:id').patch(upDateTodo).delete(deleteTodo);

module.exports = router;
