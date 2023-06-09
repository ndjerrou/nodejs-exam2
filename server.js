import express from 'express';

import {
    router
} from './app/router.js';

const app = express();
app.use(express.json());
app.use('/library', router)

app.listen(8000, () => console.log('Listening on port 8000...'));