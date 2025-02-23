import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Manager.css";

const Manager = () => {
  const [stocks, setStocks] = useState([]);
  const [stockName, setStockName] = useState("");
  const [stockQuantity, setStockQuantity] = useState("");
  const [stockPrice, setStockPrice] = useState("");
  const [editingStockId, setEditingStockId] = useState(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:2000/api/stocks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStocks(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching stocks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const stockData = {
        symbol: stockName,
        quantity: stockQuantity,
        purchasePrice: stockPrice,
      };

      if (editingStockId) {
        await axios.put(`http://localhost:2000/api/stocks/${editingStockId}`, stockData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEditingStockId(null);
      } else {
        await axios.post("http://localhost:2000/api/stocks", stockData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }

      resetForm();
      fetchStocks();
    } catch (error) {
      console.error("Error saving stock:", error);
    }
  };

  const handleEditStock = (stock) => {
    setStockName(stock.symbol);
    setStockQuantity(stock.quantity);
    setStockPrice(stock.purchasePrice);
    setEditingStockId(stock._id);
  };

  const handleDeleteStock = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:2000/api/stocks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchStocks();
    } catch (error) {
      console.error("Error deleting stock:", error);
    }
  };

  const resetForm = () => {
    setStockName("");
    setStockQuantity("");
    setStockPrice("");
  };

  return (
    <div className="manager-container">
      <h1 className="test">Stock Manager</h1>
      <form onSubmit={handleSubmit} className="stock-form">
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
        <button type="submit" className="gold-button">
          {editingStockId ? "Update Stock" : "Add Stock"}
        </button>
      </form>
      <ul className="stock-list">
        {stocks.map((stock) => (
          <li key={stock._id} className="stock-item">
            <span>
              {stock.symbol} - Qty: {stock.quantity} - Price: ${stock.purchasePrice}
            </span>
            <div className="button-group">
              <button onClick={() => handleEditStock(stock)} className="gold-button edit">
                Edit
              </button>
              <button onClick={() => handleDeleteStock(stock._id)} className="gold-button delete">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Manager;
