import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CustomPieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const RADIAN = Math.PI / 180;
  
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (!showTextAnchor) return null;
    
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize="14"
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg border shadow-lg">
          <p className="font-semibold text-gray-800">{data.payload.name}</p>
          <p className="text-sm text-gray-600">
            Amount: <span className="font-medium">${Math.abs(data.value).toLocaleString()}</span>
          </p>
        </div>
      );
    }
    return null;
  };

  // Process data to show absolute values for pie chart
  const processedData = data.map(item => ({
    ...item,
    displayAmount: Math.abs(item.amount)
  }));

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={processedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="displayAmount"
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value, entry) => (
              <span style={{color: entry.color}}>
                {value}: Ksh {Math.abs(entry.payload.amount).toLocaleString()}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
      
      
    </div>
  );
};

export default CustomPieChart;