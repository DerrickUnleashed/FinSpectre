import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios

import './Manager.css'; // Assuming you will create a Manager.css for specific styles

const Manager = () => {
  const [stocks, setStocks] = useState([]); 
  const [stockName, setStockName] = useState('');
  const [stockQuantity, setStockQuantity] = useState(''); // Added state for quantity
  const [stockPrice, setStockPrice] = useState('');
  const [editingStockId, setEditingStockId] = useState(null);

  // Fetch stocks from the database
  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      const response = await axios.get('http://localhost:5000/api/stocks', {
        headers: {
          Authorization: `Bearer ${token}`, // Set the Authorization header
        },
      });
      setStocks(Array.isArray(response.data) ? response.data : []); // Ensure stocks is an array
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  useEffect(() => {
    fetchStocks();
  }, []);

  const handleAddStock = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token'); // Retrieve token from local storage
      if (editingStockId) {
        // Update stock logic
        await axios.put(`http://localhost:5000/api/stocks/${editingStockId}`, {
          symbol: stockName, // Use symbol instead of name
          quantity: stockQuantity, // Use quantity
          purchasePrice: stockPrice, // Use purchasePrice instead of price
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
        setEditingStockId(null);
      } else {
        // Add new stock logic
        await axios.post('http://localhost:5000/api/stocks', {
          symbol: stockName, // Use symbol instead of name
          quantity: stockQuantity, // Use quantity
          purchasePrice: stockPrice, // Use purchasePrice instead of price
        }, {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header
          },
        });
      }
      setStockName('');
      setStockQuantity(''); // Reset quantity
      setStockPrice('');
      fetchStocks(); // Refresh the stock list
    } catch (error) {
      console.error('Error adding/updating stock:', error);
    }
  };

  const handleEditStock = (stock) => {
    setStockName(stock.symbol); // Set symbol for editing
    setStockQuantity(stock.quantity); // Set quantity for editing
    setStockPrice(stock.purchasePrice); // Set purchasePrice for editing
    setEditingStockId(stock._id); // Use _id for editing
  };

  const handleDeleteStock = async (id) => {
    const token = localStorage.getItem('token'); // Retrieve token from local storage
    await axios.delete(`http://localhost:5000/api/stocks/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Set the Authorization header
      },
    });
    fetchStocks(); // Refresh the stock list
  };

  return (
    <div className="manager-container">
      <h1>Stock Manager</h1>
      <form onSubmit={handleAddStock}>
        <input
          type="text"
          placeholder="Stock Symbol"
          value={stockName}
          onChange={(e) => setStockName(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Quantity"
          value={stockQuantity}
          onChange={(e) => setStockQuantity(e.target.value)}
          required
        />
        <input
          type="number"
          placeholder="Purchase Price"
          value={stockPrice}
          onChange={(e) => setStockPrice(e.target.value)}
          required
        />
        <button type="submit" className="fancy-button">
          {editingStockId ? 'Update Stock' : 'Add Stock'}
        </button>
      </form>
      <ul className="stock-list">
        {stocks.map(stock => (
          <li key={stock._id}> 
            <span>{stock.symbol} - Quantity: {stock.quantity} - Price: ${stock.purchasePrice}</span>
            <button onClick={() => handleEditStock(stock)} className="fancy-button">Edit</button>
            <button onClick={() => handleDeleteStock(stock._id)} className="fancy-button">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manager;
