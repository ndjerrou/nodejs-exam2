const express = require('express')
const Api = require('./resources/library/library.router')

const app = express();
app.use(express.json());

app.use('/', Api)


app.listen(3000, () => console.log("Ecoute en cours sur 3000 ..."))
