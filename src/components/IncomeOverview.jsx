import { Plus } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { IncomeLineChartData } from './IncomeLineChartData';
import { CustomLineChartData } from './CustomLineChartData';

const IncomeOverview = ({transactions, onAddIncome}) => {

  const[chartData, setChartData] = useState([]);
  useEffect(()=>{
  const result = IncomeLineChartData(transactions);
  setChartData(result);

  return () => {}
  }, [transactions])
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <div>
          <h5 className='text-lg'>Income Overview</h5>
          <p className='text-xs text-gray-400 mt-0 5'>
            Track your earnings overt time and analyze your income trends
          </p>
        </div>
      <button 
          onClick = {onAddIncome}
          className='card-btn text-green-500 flex items-center'>
            <Plus size={15} className='text-lg'/> Add Income
          </button>
        
      </div>
      <div className='mt-10'>
          {/* income line chart */}
          <CustomLineChartData data={chartData}/>
        </div>
    </div>
  )
}

export default IncomeOverview