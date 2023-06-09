export const auth = (req, res, next) => {

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    req = {
      ...req,
      user: 'Authenticated'
    }
  }

  if (!req.user) {
    res.status(403).send('Unauthorised access on protected route');
    return;
  }
  next();
}