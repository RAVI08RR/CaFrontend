'use client';

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Completed', value: 45.0, color: '#1e3a8a' }, // Dark Blue
  { name: 'In Progress', value: 30.0, color: '#22c55e' }, // Green
  { name: 'Pending Review', value: 15.0, color: '#f59e0b' }, // Yellow
  { name: 'Overdue', value: 7.0, color: '#ef4444' }, // Red
  { name: 'Not Started', value: 3.0, color: '#3b82f6' }, // Light Blue
];

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = (props) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent, index, stroke, name } = props;
  const radius = outerRadius * 1.2; // Distance of label from center
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  // Custom line calculation
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 5) * cos;
  const sy = cy + (outerRadius + 5) * sin;
  const mx = cx + (outerRadius + 20) * cos;
  const my = cy + (outerRadius + 20) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 15; // horizontal extension
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={data[index].color} fill="none" strokeWidth={1.5} />
      <text x={ex + (cos >= 0 ? 1 : -1) * 8} y={ey} dy={4} textAnchor={textAnchor} fill="#374151" className="text-xs font-bold font-sans">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    </g>
  );
};

const TaskStatusChart = () => {
  return (
    <div className="w-full h-full min-h-[300px]">
       <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={0} // Full Pie
            outerRadius={90}
            dataKey="value"
            label={renderCustomizedLabel}
            labelLine={false} // Drawing custom lines in renderCustomizedLabel
            paddingAngle={0}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
          />
          <Legend 
             verticalAlign="bottom" 
             height={36} 
             iconType="circle"
             iconSize={10}
             wrapperStyle={{ paddingTop: '20px', fontSize: '12px', width: '100%', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TaskStatusChart;
