import { ArrowRight } from 'lucide-react'
import moment from 'moment'
import React from 'react'
import TransactionCard from '../components/TransactionCard';
import { formatAmount } from '../util/CurrencyFormatter';

const TRansactions = ({transactions,onMore, type,title}) => {
  return (
    <div className='card'>
      <div className='flex items-centet justify-between'>
        <h5 className='text-lg'>{title}</h5>
        <button className='card-btn text-green-500' onClick={onMore}>
          More <ArrowRight size={15} className='text-base'/>
        </button>
      </div>
      <div className='mt-6'>
        {transactions?.slice(0,5).map(item=>(
           <TransactionCard
                    key={item.id}
                    title={item.name}
                    icon={item.icon}
                    date={moment(item.date).format("Do MM YYYY")}
                     amount={`Ksh ${formatAmount(item.amount)}`}
                    type={type}
                    hideDeleteBtn/>
        ))}
      </div>
    </div>
  )
}

export default TRansactions