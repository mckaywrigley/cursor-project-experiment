"use client";

import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { date: "2023-01-01", AAPL: 150.25, GOOGL: 2750.8 },
  { date: "2023-02-01", AAPL: 155.5, GOOGL: 2800.0 },
  { date: "2023-03-01", AAPL: 160.75, GOOGL: 2650.5 },
  { date: "2023-04-01", AAPL: 158.0, GOOGL: 2700.25 },
  { date: "2023-05-01", AAPL: 165.25, GOOGL: 2850.75 }
];

export default function Chart2() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const handleClick = (data) => {
    setSelectedData(data);
    setIsOpen(true);
  };

  return (
    <>
      <ResponsiveContainer
        width="100%"
        height={300}
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="AAPL"
            stroke="#8884d8"
            activeDot={{ onClick: handleClick }}
          />
          <Line
            type="monotone"
            dataKey="GOOGL"
            stroke="#82ca9d"
            activeDot={{ onClick: handleClick }}
          />
        </LineChart>
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
            <Dialog.Title className="text-lg font-medium mb-2">Stock Prices on {selectedData?.date}</Dialog.Title>
            <p>AAPL: ${selectedData?.AAPL.toFixed(2)}</p>
            <p>GOOGL: ${selectedData?.GOOGL.toFixed(2)}</p>
            <p className="mt-2">This point represents the stock prices for AAPL and GOOGL on the selected date. The position on the y-axis indicates the stock value in USD.</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => setIsOpen(false)}
            >
              Close
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
