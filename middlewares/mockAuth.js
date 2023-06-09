const mockAuth = (req, res, next) => {
    const userId = req.headers['x-user-id'];

    // Simulate user fetching with userId
    const user = userId ? { id: userId, name: `User ${userId}` } : null;

    if (!user) {
        return res.status(401).send('Unauthorized: No user provided');
    }

    req.user = user;
    next();
};


module.exports = mockAuth;