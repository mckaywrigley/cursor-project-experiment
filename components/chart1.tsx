"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "AAPL", value: 150.25 },
  { name: "GOOGL", value: 2750.8 },
  { name: "MSFT", value: 305.5 },
  { name: "AMZN", value: 3380.0 },
  { name: "FB", value: 330.75 }
];

export default function Chart1() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [selectedStocks, setSelectedStocks] = useState([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);

  const handleClick = (data) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  const handleStockSelect = (stock) => {
    if (selectedStocks.includes(stock)) {
      setSelectedStocks(selectedStocks.filter((s) => s !== stock));
    } else if (selectedStocks.length < 2) {
      setSelectedStocks([...selectedStocks, stock]);
    }
  };

  const handleCompare = () => {
    if (selectedStocks.length === 2) {
      setIsCompareOpen(true);
    }
  };

  return (
    <>
      <div className="mb-4">
        {data.map((stock) => (
          <label
            key={stock.name}
            className="inline-flex items-center mr-4"
          >
            <input
              type="checkbox"
              checked={selectedStocks.includes(stock.name)}
              onChange={() => handleStockSelect(stock.name)}
              className="form-checkbox h-5 w-5 text-blue-600"
            />
            <span className="ml-2">{stock.name}</span>
          </label>
        ))}
        <button
          onClick={handleCompare}
          disabled={selectedStocks.length !== 2}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          Compare
        </button>
      </div>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="value"
            fill="#8884d8"
            onClick={handleClick}
          />
        </BarChart>
      </ResponsiveContainer>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-sm rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-2">Stock Data: {selectedData?.name}</Dialog.Title>
            <p>Current Price: ${selectedData?.value.toFixed(2)}</p>
            <p className="mt-2">This bar represents the current stock price for {selectedData?.name}. The height of the bar indicates the stock's value in USD.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog
        open={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        className="relative z-50"
      >
        <div
          className="fixed inset-0 bg-black/30"
          aria-hidden="true"
        />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded bg-white p-6">
            <Dialog.Title className="text-lg font-medium mb-2">Stock Comparison</Dialog.Title>
            {selectedStocks.map((stockName) => {
              const stock = data.find((s) => s.name === stockName);
              return (
                <div
                  key={stock.name}
                  className="mb-4"
                >
                  <h3 className="font-medium">{stock.name}</h3>
                  <p>Current Price: ${stock.value.toFixed(2)}</p>
                </div>
              );
            })}
            <p className="mt-2">This comparison shows the current stock prices for the selected stocks.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsCompareOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
