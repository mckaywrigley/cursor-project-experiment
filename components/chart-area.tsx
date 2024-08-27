"use client";

import Chart1 from "./chart1";
import Chart2 from "./chart2";

export default function ChartArea() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Current Stock Prices</h3>
        <Chart1 />
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-lg font-semibold mb-4">Stock Price Trends</h3>
        <Chart2 />
      </div>
    </div>
  );
}
