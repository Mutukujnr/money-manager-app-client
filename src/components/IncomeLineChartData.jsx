import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Simple function to group income by date
export const IncomeLineChartData = (transactions) => {
  if (!transactions || transactions.length === 0) return [];

  const grouped = {};
  
  transactions.forEach(transaction => {
    const date = transaction.date;
    const amount = parseFloat(transaction.amount) || 0;
    
    if (grouped[date]) {
      grouped[date] += amount;
    } else {
      grouped[date] = amount;
    }
  });

  return Object.keys(grouped).map(date => ({
    date,
    amount: grouped[date]
  })).sort((a, b) => new Date(a.date) - new Date(b.date));
};

