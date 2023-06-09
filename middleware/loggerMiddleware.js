const loggerMiddleware = (req, res, next) => {
  console.log(`Request received - Method: ${req.method}, Path: ${req.path}, Host: ${req.hostname}`);
  next();
};

module.exports = loggerMiddleware;
