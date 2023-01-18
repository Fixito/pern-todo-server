require('dotenv').config();
require('express-async-errors');
// librairies de sécurité supplémentaires
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

const express = require('express');
const app = express();

const authenticateUser = require('./middleware/authentication.js');

//* routers
const authRouter = require('./routes/auth.js');
const todosRouter = require('./routes/todos.js');

//* error handlers
const notFound = require('./middleware/not-found.js');
const errorHandler = require('./middleware/error-handler.js');

app.set('trust proxy', 1);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false // Disable the `X-RateLimit-*` headers
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//* routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/todos', authenticateUser, todosRouter);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:5000`);
});
