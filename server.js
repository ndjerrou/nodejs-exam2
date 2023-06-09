const express = require('express');

const books = require('./resources/books/books.router');

const app = express();

app.use(express.json());
app.use('/api/v1/books', books);

app.listen(3000, () => console.log('Port 3000 is running ...'));
