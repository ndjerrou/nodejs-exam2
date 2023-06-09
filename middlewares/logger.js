const logger = (req, res, next) => {
    console.log(`${req.method} to ${req.url} from ${req.hostname}`);
    next();
};

module.exports = logger;
