export const logger = (req, res, next) => {
  console.log(`Method: ${req.method}, Endpoint: ${req.url}`);
  for (let i = 0; i < req.rawHeaders.length; i++) {
    if (i % 2 === 0) {
      console.log(`${req.rawHeaders[i]}: ${req.rawHeaders[i + 1]},`);
    }
  }
  next();
};