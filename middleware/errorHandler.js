// errorHandler.js

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  if (err.statusCode === 404) {
    res.status(404).json({ error: 'Not Found' });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = errorHandler;
