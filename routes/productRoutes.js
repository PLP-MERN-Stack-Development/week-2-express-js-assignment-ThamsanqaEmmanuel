// imports
const productSchema = require('../Products');
const express = require('express');
const router = express.Router();
const validateProduct = require('../middleware/validateProduct');

//Create
router.post('/Products' , validateProduct , async (req, res) => {
  try {
  const newProduct = new productSchema(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
  } catch (error) {
   res.status(500).json({ error: 'Error creating product' }); 
  }
  
});

//Read
router.get('/Products', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const products = await productSchema.find(filter).skip(skip).limit(limit);
    res.send(products);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching products' });
  }
});

// Search products by name
router.get('/Products/search', async (req, res) => {
  try {
    const searchTerm = req.query.name;
    if (!searchTerm) return res.status(400).json({ error: 'Missing search query' });

    const products = await productSchema.find({
      name: { $regex: searchTerm, $options: 'i' }
    });

    res.send(products);
  } catch (error) {
    res.status(500).json({ error: 'Error searching products' });
  }
});

// Get product by ID
router.get('/Products/:id', async (req, res) => {
 try {
  const newProduct = await productSchema.findById(req.params.id);
  if (!newProduct) return res.status(404).send();
  res.send(newProduct);
 } catch (error) {
  res.status(500).json({ error: 'Error fetching product' });
  
 }
});

// Update product by ID
router.put('/Products/:id', validateProduct , async (req, res) => {
  try {
    const newProduct = await productSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true,runValidators:true}
    );
    if (!newProduct) return res.status(404).send();
    res.send(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Error updating product' });
    
  }
});

// Delete product by ID
router.delete('/Products/:id', async (req, res) => {
  try {
    const newProduct = await productSchema.findByIdAndDelete(req.params.id);
    if (!newProduct) return res.status(404).send(); 
    res.status(204).send();
  } catch (error) {
    res.status(500).send(error)
  }
});



//Stats
router.get('/Products/stats', async (req, res) => {
  try {
    const stats = await productSchema.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching product stats' });
  }
});


module.exports = router;
