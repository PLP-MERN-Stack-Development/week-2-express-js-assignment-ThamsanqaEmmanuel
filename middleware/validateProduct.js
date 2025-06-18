module.exports = function (req, res, next) {
  const { name, description, price, category } = req.body;
  if (!name || typeof name !== 'string'  || !description == undefined || !price || typeof price !== 'number' || !category === undefined) {
    return res.status(400).json({ error: 'Invalid product data' });
  }
  next();
};
