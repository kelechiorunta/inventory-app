'use client'
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCircle } from 'react-icons/fa';

// Dummy Sales Data for the Year
const salesOrderList = [
  { month: 'Jan', directSales: 10000, retail: 8000, wholesale: 6000 },
  { month: 'Feb', directSales: 12000, retail: 7000, wholesale: 5000 },
  { month: 'Mar', directSales: 8000, retail: 9000, wholesale: 4000 },
  { month: 'Apr', directSales: 15000, retail: 10000, wholesale: 7000 },
  { month: 'May', directSales: 11000, retail: 9000, wholesale: 6000 },
  { month: 'Jun', directSales: 13000, retail: 12000, wholesale: 10000 },
  { month: 'Jul', directSales: 9000, retail: 11000, wholesale: 7000 },
  { month: 'Aug', directSales: 18000, retail: 13000, wholesale: 12000 },
  { month: 'Sep', directSales: 14000, retail: 9000, wholesale: 8000 },
  { month: 'Oct', directSales: 20000, retail: 15000, wholesale: 11000 },
  { month: 'Nov', directSales: 22000, retail: 13000, wholesale: 10000 },
  { month: 'Dec', directSales: 25000, retail: 14000, wholesale: 12000 },
];

const SalesOrderChart = () => {
  return (
    <div className="w-full h-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales Report</h2>
      
      {/* Responsive Container for the chart */}
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={salesOrderList}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          {/* Grid lines */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis for months */}
          <XAxis dataKey="month" stroke="#8884d8" />

          {/* Y-Axis for sales */}
          <YAxis stroke="#8884d8" />

          {/* Tooltip for hover */}
          <Tooltip />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            align="right"
            iconType="circle"
            formatter={(value, entry) => {
              let color;
              if (value === "Direct Sales") color = "#00C6FF";
              if (value === "Retail") color = "#7B61FF";
              if (value === "Wholesale") color = "#FF3366";
              return (
                <span style={{ color }}>
                  <FaCircle size={12} className="inline mr-1" /> {value}
                </span>
              );
            }}
          />

          {/* Line for Direct Sales */}
          <Line type="monotone" dataKey="directSales" stroke="#00C6FF" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />

          {/* Line for Retail Sales */}
          <Line type="monotone" dataKey="retail" stroke="#7B61FF" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />

          {/* Line for Wholesale */}
          <Line type="monotone" dataKey="wholesale" stroke="#FF3366" strokeWidth={2} dot={{ r: 6 }} activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOrderChart;
