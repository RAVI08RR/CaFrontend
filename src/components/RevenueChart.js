'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', revenue: 45000 },
  { name: 'Feb', revenue: 65000 }, // Adjusted to look more like the image (2nd bar higher)
  { name: 'Mar', revenue: 52000 },
  { name: 'Apr', revenue: 72000 }, // 4th bar higher
  { name: 'May', revenue: 68000 },
  { name: 'Jun', revenue: 85000 }, // Last bar highest
];

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 border border-gray-100 dark:border-gray-700 shadow-lg rounded-lg text-sm">
          <p className="font-semibold text-gray-900 dark:text-gray-100">{label}</p>
          <p className="text-blue-600 dark:text-blue-400">
             ₹ {(payload[0].value / 1000).toFixed(1)} Lakhs
          </p>
        </div>
      );
    }
    return null;
};

const RevenueChart = () => {
  return (
    <div className="w-full h-full min-h-[300px]">
       <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 0,
            left: -20,
            bottom: 0,
          }}
          barSize={32} // Slightly thinner to match "pole" look
        >
          <CartesianGrid vertical={false} stroke="#f3f4f6" strokeDasharray="0" />
          <XAxis 
            dataKey="name" 
            axisLine={{ stroke: '#e5e7eb', strokeWidth: 1 }} // Keep the bottom line
            tick={false} // Hide text
            tickLine={false} 
          />
          <YAxis 
             axisLine={false} 
             tick={false} // Hide text
             tickLine={false} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar 
            dataKey="revenue" 
            fill="#1e40af" // Deep blue matching the image
            radius={[4, 4, 4, 4]} // Slightly more rounded all around or top
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
