import express from 'express';

import {
  router
} from './app/router.js';

import { initData } from "./app/data-handling/read-write.js"

initData()
const app = express();
app.use(express.json());
app.use('/books', router)

app.listen(3000, () => console.log('Listening on port 3000...'));