import React, { useState } from 'react'
import { useUser } from '../Hooks/useUserHook'
import { Search } from 'lucide-react'
import axiosConfig from '../util/AxiosConfig';
import { apiEndpoints } from '../util/ApiEndpoints';
//import { setLegendSettings } from 'recharts/types/state/legendSlice';
import toast from 'react-hot-toast';
import TransactionCard from '../components/TransactionCard'
import moment from 'moment';
import Dashboard from '../components/Dashboard';
import { formatAmount } from '../util/CurrencyFormatter';

const Filter = () => {
  useUser() ;
  // Custom hook to fetch user data and manage user state
  const[type, setType] = useState("income");
  const[startdate, setStartDate] = useState("");
  const[enddate, setEndDate] = useState("")
  const[keyword, SetKeyword] = useState("")
  const[sortField, SetSortField] = useState("date");
  const[sortOrder, SetSortOrder] = useState("asc");
  const[transactions, SetTreansactions] = useState([]);
  const[loading, SetLoading] = useState(false);

  const handleSearch = async(e)=>{
    e.preventDefault();
   SetLoading(true);

   try {
   const response = await axiosConfig.post(apiEndpoints.APPLY_FILTERS,{
      type,
      startdate,
      enddate,
      keyword,
      sortField,
      sortOrder
    })

    SetTreansactions(response.data);
   } catch (error) {
    console.log(error);
    toast.error('could not fetch data');
   }finally{
    SetLoading(false);
   }
  }
  return (
    <Dashboard activeMenu="Filters">
      <div className='my-5 mx-auto'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-2xl font-semibold'>Filter Transactions</h2>
        </div>
        <div className='card p-4 mb-4'>
          <div className='flex items-center justify-between mb-4'>
            <h5 className='text-lg font-semibold'>Select Filters</h5>
          </div>
          <form action="" className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4'>
            <div>
              <label htmlFor="type" className='block text-sm font-medium mb-1'>Type</label>
              <select value={type} id="type" className='w-full border rounded px-3 py-2' onChange={(e)=>setType(e.target.value)}>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
            <div>
              <label htmlFor="startdate" className='block text-sm font-medium mb-1'>Start Date</label>
              <input value={startdate} id='startdate' type="date" className='w-full border rounded px-3 py-2' onChange={(e)=> setStartDate(e.target.value)}/>
            </div>
            <div>
              <label htmlFor="enddate" className='block text-sm font-medium mb-1'>End Date</label>
              <input value={enddate} id='enddate' type="date" className='w-full border rounded px-3 py-2' onChange={(e)=>setEndDate(e.target.value)}/>
            </div>
             <div>
              <label htmlFor="sortField" className='block text-sm font-medium mb-1'>Type</label>
              <select value={sortField} id="type" className='w-full border rounded px-3 py-2' onChange={(e)=>SetSortField(e.target.value)}>
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                 <option value="category">Category</option>
              </select>
            </div>
            <div>
              <label htmlFor="sort" className='block text-sm font-medium mb-1'>Sort Order</label>
              <select value={sortOrder} id="sort" className='w-full border rounded px-3 py-2' onChange={(e)=>SetSortOrder(e.target.value)}>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className='sm:col-span-1 md:col-span-1 flex items-end'>
              <div className='w-full'>
                 <label htmlFor="keyword" className='block text-sm font-medium mb-1'>Search</label>
                               <input value={keyword} id='keyword' type="text" placeholder='search' className='w-full border rounded px-3 py-2' onChange={(e)=>SetKeyword(e.targer.value)}/>
              </div>
              <button onClick={handleSearch} className='ml-2 mb-1 p-2 bg-purple-800 hover:bg-purple-800 text-white rounded flex items-center justify-center cursor-pointer'>
                <Search size={20}/>
              </button>
            </div>
          </form>
        </div>
        <div className='card p-4'>
          {transactions.length === 0 && !loading? (
          <p className ='text-gray-500'>select filers and click search to apply</p>
          ): ""}

          {loading ? (
            <p className='text-gray-500'>Loading transactions</p>
          ):("")}
          {transactions.map((transaction)=>(
            <TransactionCard
            key={transaction.id}
            title={transaction.title}
            icon={transaction.icon}
            date={moment(transaction.date).format('Do MM YYYY')}
            amount={`Ksh ${formatAmount(transaction.amount)}`}
            type={type}
            hideDeleteBtn
            />
          ))}
        </div>
       </div>
    </Dashboard>
  )
}

export default Filter