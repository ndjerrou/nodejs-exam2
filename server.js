import express from 'express';

import {
    router
} from './app/router.js';
import {
    logger
} from './middlewares/logger.js';

const app = express();
app.use(express.json());
// app.use(logger);
app.use('/library', router)

app.listen(8000, () => console.log('Listening on port 8000...'));