import React from 'react';
import CustomPieChart from './CustomPieChart';

const FinanceOverview = ({ totalBalance, totalIncome, totalExpense }) => {
  const COLORS = ["#59168B", "#a0090e", "#016630"];
  
  const balanceData = [
    { name: "Total Balance", amount: totalBalance },
    { name: "Total Income", amount: totalIncome },
    { name: "Total Expenses", amount: totalExpense }
  ];

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Financial Overview</h5>
      </div>

      <CustomPieChart
        data={balanceData}
        label="Total Balance"
        totalAmount={totalBalance}
        colors={COLORS}
        showTextAnchor
      />
    </div>
  );
};

export default FinanceOverview;