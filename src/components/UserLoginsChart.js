'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ComposedChart } from 'recharts';
import { useState } from 'react';
import clsx from 'clsx';

const data = [
  { name: 'Oct 5', logins: 70 },
  { name: 'Oct 6', logins: 85 },
  { name: 'Oct 7', logins: 45 },
  { name: 'Oct 8', logins: 90 },
  { name: 'Oct 9', logins: 30 },
  { name: 'Oct 10', logins: 200 },
  { name: 'Oct 11', logins: 180 },
  { name: 'Oct 12', logins: 140 },
  { name: 'Oct 13', logins: 155 },
  { name: 'Oct 14', logins: 120 },
  { name: 'Oct 15', logins: 135 },
  { name: 'Oct 16', logins: 105 },
  { name: 'Oct 17', logins: 175 },
  { name: 'Oct 18', logins: 210 },
  { name: 'Oct 19', logins: 200 },
  { name: 'Oct 20', logins: 165 },
  { name: 'Oct 21', logins: 205 },
  { name: 'Oct 22', logins: 150 },
  { name: 'Oct 23', logins: 250 },
  { name: 'Oct 24', logins: 230 },
  { name: 'Oct 25', logins: 220 },
  { name: 'Oct 26', logins: 190 },
  { name: 'Oct 27', logins: 235 },
  { name: 'Oct 28', logins: 200 },
  { name: 'Oct 29', logins: 260 },
  { name: 'Oct 30', logins: 270 },
  { name: 'Oct 31', logins: 240 },
  { name: 'Nov 1', logins: 255 },
  { name: 'Nov 2', logins: 230 },
  { name: 'Nov 3', logins: 290 },
];

const UserLoginsChart = () => {
  const [activeRange, setActiveRange] = useState('30 Days');

  const ranges = ['30 Days', '6 Months', '1 Year'];

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] dark:shadow-none h-full">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">User Logins (Last 30 Days)</h3>
        <div className="flex bg-gray-50 dark:bg-gray-800 rounded-lg p-1">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className={clsx(
                "px-4 py-1.5 text-xs font-semibold rounded-md transition-all",
                activeRange === range
                  ? "bg-white dark:bg-gray-700 text-blue-700 dark:text-blue-400 shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <defs>
              <linearGradient id="colorLogins" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0EA5E9" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#0EA5E9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#E5E7EB" className="dark:stroke-gray-700" strokeDasharray="0" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#6B7280' }} 
              dy={10}
              interval={1}
              angle={-45}
              textAnchor="end"
              height={50}
            />
            <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fontSize: 10, fill: '#6B7280' }} 
                domain={[0, 350]}
                ticks={[50, 100, 150, 200, 250, 300, 350]}
                label={{ value: 'Number of Logins', angle: -90, position: 'insideLeft', style: { fontSize: '10px', fill: '#9CA3AF' } }}
            />
            <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}
                cursor={{ stroke: '#0EA5E9', strokeWidth: 1, strokeDasharray: '4 4' }}
            />
            <Line 
              type="monotone" 
              dataKey="logins" 
              stroke="#0EA5E9"
              strokeWidth={2} 
              dot={{ r: 3,  fill: "#0EA5E9", strokeWidth: 2, stroke: "#fff" }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default UserLoginsChart;
