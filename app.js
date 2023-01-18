require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const notFound = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js');

const authRouter = require('./routes/auth.js');
const todosRouter = require('./routes/todos.js');

app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', todosRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:5000`);
});
