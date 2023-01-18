require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const authenticateUser = require('./middleware/authentication.js');

//* routers
const authRouter = require('./routes/auth.js');
const todosRouter = require('./routes/todos.js');

//* error handlers
const notFound = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js');

app.use(express.json());

//* routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', authenticateUser, todosRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:5000`);
});
