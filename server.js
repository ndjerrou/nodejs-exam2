const express = require('express');
const app = express();
const port = 3000;

const router = require('./routes');
const logger = require('./middlewares/logger');

app.use(express.json());
app.use(logger);
app.use('/api', router);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
