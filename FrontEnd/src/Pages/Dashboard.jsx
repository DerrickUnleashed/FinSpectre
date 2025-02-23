import React from 'react';
import { Line, Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';
import './Dashboard.css'; // Assuming you will create a Dashboard.css for specific styles

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

const Dashboard = () => {
  // Static data for stocks
  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Stock A',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(255, 215, 0, 1)', // Gold color
        backgroundColor: 'rgba(255, 215, 0, 0.2)', // Light gold background
        borderWidth: 2,
      },
    ],
  };

  const barData = {
    labels: ['Stock B', 'Stock C', 'Stock D'],
    datasets: [
      {
        label: 'Stock Prices',
        data: [28, 48, 40],
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Light white background
      },
    ],
  };

  const pieData = {
    labels: ['Stock E', 'Stock F', 'Stock G'],
    datasets: [
      {
        label: 'Market Share',
        data: [300, 50, 100],
        backgroundColor: ['rgba(255, 215, 0, 1)', 'rgba(255, 255, 255, 1)', 'rgba(100, 100, 100, 1)'],
      },
    ],
  };

  return (
    <div className="dashboard-heading">
      <h2 className="dashboard-title">Stock Dashboard</h2>
    <div className="dashboard-container">
        <div className="chart-item">

          <h2>Price Trends</h2>

          <Line data={lineData} />
        </div>
        <div className="chart-item">
          <h2>Volume Analysis</h2>

          <Bar data={barData} />
        </div>
        <div className="chart-item">
          <h2>Portfolio Allocation</h2>

          <Pie data={pieData} />
        </div>
        <div className="chart-item">
          <h2>Technical Indicators</h2>

          <Line data={lineData} />
        </div>
        <div className="chart-item">
          <h2>Sector Performance</h2>

          <Bar data={barData} />
        </div>
        <div className="chart-item">
          <h2>Risk Distribution</h2>

          <Pie data={pieData} />
        </div>
        <div className="chart-item">
          <h2>Moving Averages</h2>

          <Line data={lineData} />
        </div>
        <div className="chart-item">
          <h2>Market Sentiment</h2>

          <Bar data={barData} />
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
