const express = require('express');
const router = express.Router();
const stockController = require('../controllers/stockController');
const { protect } = require('../middleware/authMiddleware');

// Fetch stocks for the authenticated user
router.get('/', protect, stockController.fetchStocks);

// Add a new stock
router.post('/', protect, stockController.addStock);

// Update a stock by ID
router.put('/:id', protect, stockController.updateStock);

// Delete a stock by ID
router.delete('/:id', protect, stockController.deleteStock);

module.exports = router;
