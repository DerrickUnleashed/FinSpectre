import React, { useEffect, useState } from "react";
import {
  SciChartSurface,
  NumericAxis,
  CategoryAxis,
  FastCandlestickRenderableSeries,
  OhlcDataSeries,
  EAutoRange,
} from "scichart";
import "./Dashboard.css"; // Assuming you will create a Dashboard.css for specific styles

SciChartSurface.configure({
  licenseKey: "YOUR_LICENSE_KEY_HERE", // Keep this line as requested
  wasmUrl: "/_wasm/scichart2d.wasm",
  dataUrl: "/_wasm/scichart2d.data",
});

const CandlestickChart = ({ chartId }) => {
  const [sciChartSurface, setSciChartSurface] = useState(null);

  useEffect(() => {
    const initChart = async () => {
      const { sciChartSurface, wasmContext } = await SciChartSurface.create(chartId);

      // X and Y axes
      const xAxis = new CategoryAxis(wasmContext);
      const yAxis = new NumericAxis(wasmContext);
      yAxis.autoRange = EAutoRange.Always;

      sciChartSurface.xAxes.add(xAxis);
      sciChartSurface.yAxes.add(yAxis);

      // OHLC Data Series
      const ohlcDataSeries = new OhlcDataSeries(wasmContext);

      // Adding 50 Data Points
      let time = Date.now();
      let price = 100;
      for (let i = 0; i < 20; i++) {
        const open = price;
        const close = open + (Math.random() * 4 - 2);
        const high = Math.max(open, close) + Math.random() * 2;
        const low = Math.min(open, close) - Math.random() * 2;
        ohlcDataSeries.append(time, open, high, low, close);
        time += 1000 * 60; // Increment time (1-minute intervals)
        price = close;
      }

      // Candlestick Series
      const candleSeries = new FastCandlestickRenderableSeries(wasmContext, {
        dataSeries: ohlcDataSeries,
      });

      sciChartSurface.renderableSeries.add(candleSeries);

      setSciChartSurface(sciChartSurface);
    };

    initChart();

    return () => sciChartSurface?.delete();
  }, [chartId]);

  return <div id={chartId} style={{ width: "100%", height: "500px" }} />;
};

const Dashboard = () => {
  const chartIds = [
    "chart-Price-Trends",
    "chart-Volume-Analysis",
    "chart-Portfolio-Allocation",
    "chart-Technical-Indicators",
    "chart-Sector-Performance",
    "chart-Risk-Distribution",
    "chart-Moving-Averages",
    "chart-Market-Sentiment",
  ];

  return (
    <div className="dashboard-heading">
      <h2 className="dashboard-title">Stock Dashboard</h2>
      <div className="dashboard-container">
        {chartIds.map((id, index) => (
          <div key={id} className="chart-item">
            <h2>{id.replace("chart-", "").replace("-", " ")}</h2>
            <CandlestickChart chartId={id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
