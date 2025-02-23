const Stock = require('../models/Stock');

// Fetch stocks for the current user
exports.fetchStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user._id });
    res.json(stocks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch stocks' });
  }
};

// Add a new stock
exports.addStock = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const { symbol, quantity, purchasePrice } = req.body;
    const stock = new Stock({
      userId: req.user._id,
      symbol,
      quantity,
      purchasePrice,
    });


    await stock.save();
    res.status(201).json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add stock' });
  }
};

// Update an existing stock
exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { symbol, quantity, purchasePrice } = req.body;
    const stock = await Stock.findByIdAndUpdate(
      id,
      { symbol, quantity, purchasePrice },
      { new: true }
    );
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json(stock);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update stock' });
  }
};

// Delete a stock
exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    const stock = await Stock.findByIdAndDelete(id);
    if (!stock) {
      return res.status(404).json({ message: 'Stock not found' });
    }
    res.json({ message: 'Stock deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete stock' });
  }
};
