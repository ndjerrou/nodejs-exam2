const express = require('express');
const products = require('./resources/books.router');

const app = express();

const PORT = 9000;

app.use(express.json());
app.use('/api/v1/books', products);

app.listen(9000, () => console.log(`Listening on port ${PORT}...`));