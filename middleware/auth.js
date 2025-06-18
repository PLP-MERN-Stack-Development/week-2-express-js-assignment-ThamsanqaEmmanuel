module.exports = function (req, res, next) {
     const apiKey = req.headers['x-api-key'];
  if (!apiKey || apiKey !== '12345') {
    return res.status(401).json({ error: 'Unauthorized - Invalid API Key' });
  }
  next();
};
