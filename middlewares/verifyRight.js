

module.exports = (req, res, next) => {

    if (!req.user)
        return res.status(403).send({ ok: false, msg: 'Forbidden must be logged to do this' });

    next();
};
