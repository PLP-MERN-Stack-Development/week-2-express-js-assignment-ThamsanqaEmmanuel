// routes/productRoutes.js
const express = require('express');
const { v4: uuidv4 } = require('uuid');
const validateProduct = require('../middleware/validateProduct');

const router = express.Router();

let products = [
  { id: '1', name: 'Laptop', description: 'High-performance laptop with 16GB RAM', price: 1200, category: 'electronics', inStock: true },
  { id: '2', name: 'iPhone 16 Pro Max', description: 'Latest model with 128GB storage', price: 800, category: 'electronics', inStock: true },
  { id: '3', name: 'Coffee Maker', description: 'Programmable coffee maker with timer', price: 50, category: 'kitchen', inStock: false },
  { id: '4', name: 'Smart watch', description: 'Latest model S7', price: 900, category: 'electronics', inStock: true }
];

router.get('/', (req, res) => {
  let result = [...products];
  if (req.query.category) result = result.filter(p => p.category === req.query.category);
  if (req.query.name) result = result.filter(p => p.name.toLowerCase().includes(req.query.name.toLowerCase()));

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const paginated = result.slice(start, start + limit);

  res.json({ page, limit, total: result.length, data: paginated });
});

router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

router.post('/', validateProduct, (req, res) => {
  const newProduct = { id: uuidv4(), ...req.body };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  products[index] = { id: req.params.id, ...req.body };
  res.json(products[index]);
});

router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });
  const deleted = products.splice(index, 1);
  res.json(deleted[0]);
});

router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });
  res.json(stats);
});

module.exports = router;
