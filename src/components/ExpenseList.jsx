import { Download, LoaderCircle, Mail } from 'lucide-react'
import React, { useState } from 'react'
import TransactionCard from './TransactionCard'
import moment from 'moment'
import { formatAmount } from '../util/CurrencyFormatter'

const ExpenseList = ({transactions,onDelete, onDownload, onEmail}) => {

  const[loading, setLoading] = useState(false);

const handleDownload = async()=>{
  setLoading(true);
  try{
    await onDownload();
  }finally{
    setLoading(false);
  }
}

const handleEmailing = async()=>{
  setLoading(true);
  try{
    await onEmail();
  }finally{
    setLoading(false);
  }
}

  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Expense Sources</h5>
        <div className='flex flex-col sm:flex-row items-center justify-end gap-2'>
          <button 
           onClick={onEmail}
           disabled={loading}
          className='card-btn text-green-500 flex items-center gap-2'>
            <Mail
            onClick={handleEmailing}
            size={15} className='text-base'/> 
            {loading ? (
              <>
              <LoaderCircle className='w-4 h-4 animate-spin'/> Emailing...
              </>
            ): (
              <>
              Email
              </>
            )}
            
           
          </button>
          <button 
          disabled={loading}
          onClick={handleDownload}
          className='card-btn text-green-500 flex items-center gap-2'>
            <Download 
            
            size={15} className='text-base'/> 
            
           {loading ? (
              <>
              <LoaderCircle className='w-4 h-4 animate-spin'/> Downloading...
              </>
            ): (
              <>
              Download
              </>
            )}
          </button>
        </div>
      </div>
       <div className='grid grid-cols-1 md:grid-cols-2'>
          {/* display income data */}
          {transactions?.map((expense)=>(
            <TransactionCard
            key={expense.id}
            title={expense.title}
            icon={expense.icon}
            date={moment(expense.date).format('Do MM YYYY')}
            amount={`Ksh ${formatAmount(expense.amount)}`}
            type='income'
            onDelete={()=> onDelete(expense.id)}
            />
          ))}
          <TransactionCard/>
        </div>
    </div>
  )
}

export default ExpenseList