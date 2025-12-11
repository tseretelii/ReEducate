const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

// GET /products?page=1&limit=5
router.get('/', async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const skip = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find().skip(skip).limit(limit),
      Product.countDocuments(),
    ]);

    res.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

// POST /products
router.post('/', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || price === undefined || !category) {
      return res
        .status(400)
        .json({ error: 'name, price, and category are required' });
    }

    const product = await Product.create({
      name,
      price,
      category,
      description,
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to create product' });
  }
});

// PUT /products/:id
router.put('/:id', async (req, res) => {
  try {
    const { name, price, category, description } = req.body;
    if (!name || price === undefined || !category) {
      return res
        .status(400)
        .json({ error: 'name, price, and category are required for update' });
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, category, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message || 'Failed to update product' });
  }
});

// DELETE /products/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(400).json({ error: 'Invalid product ID' });
  }
});

module.exports = router;

