const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('PERN Todo');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Le serveur écoute sur http://localhost:5000`);
});
