import React from 'react';
import { Line } from 'react-chartjs-2';
import './Dashboard.css'; // Assuming you will create a Dashboard.css for specific styles

const Dashboard = () => {
  // Static data for stocks
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Stock A',
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: 'rgba(255, 215, 0, 1)', // Gold color
        backgroundColor: 'rgba(255, 215, 0, 0.2)', // Light gold background
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 215, 0, 1)',
        pointBorderColor: 'rgba(255, 215, 0, 1)',
        pointHoverBackgroundColor: 'rgba(255, 215, 0, 1)',
        pointHoverBorderColor: 'rgba(255, 215, 0, 1)',
      },
      {
        label: 'Stock B',
        data: [28, 48, 40, 19, 86, 27, 90],
        borderColor: 'rgba(255, 255, 255, 1)', // White color
        backgroundColor: 'rgba(255, 255, 255, 0.2)', // Light white background
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointBorderColor: 'rgba(255, 255, 255, 1)',
        pointHoverBackgroundColor: 'rgba(255, 255, 255, 1)',
        pointHoverBorderColor: 'rgba(255, 255, 255, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Months',
          color: 'rgba(255, 215, 0, 1)', // Gold color
        },
      },
      y: {
        title: {
          display: true,
          text: 'Stock Price',
          color: 'rgba(255, 215, 0, 1)', // Gold color
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: 'rgba(255, 215, 0, 1)', // Gold color
        },
      },
    },
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Stock Dashboard</h1>
      <div className="chart-container">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
