const express = require("express");
const port = 8000;

app = express();
app.use(express.json());

const booksRoutes = require("./Routes/books");
app.use(booksRoutes);

app.listen(port, () => console.log(`Server started at port : ${port} `));
