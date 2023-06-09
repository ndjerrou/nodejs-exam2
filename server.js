const express = require('express');
const bodyParser = require('body-parser');

const books = require('./resources/books/books.router');

const app = express();

app.use(bodyParser.json());
app.use('/api/v1', books);
app.use(express.json());

app.listen(8000, () => console.log('Port 8000 on tha plaaaace'));
