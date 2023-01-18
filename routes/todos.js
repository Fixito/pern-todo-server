const express = require('express');
const router = express.Router();

const {
  createTodo,
  getAllTodos,
  upDateTodo,
  deleteTodo
} = require('../controllers/todos.js');

router.route('/').get(getAllTodos).post(createTodo);
router.route('/:id').patch(upDateTodo).delete(deleteTodo);

module.exports = router;
