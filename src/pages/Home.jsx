import React, { useEffect, useState } from 'react'
import Dashboard from '../components/Dashboard'
import {useUser} from '../Hooks/useUserHook'; // Custom hook to manage user data
import InfoCard from '../components/InfoCard';
import { Coins, Wallet, WalletCards } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosConfig from '../util/AxiosConfig';
import { apiEndpoints } from '../util/ApiEndpoints';
import RecentTransactions from '../components/RecentTransactions';
import FinanceOverview from '../components/FinanceOverview';
import TRansactions from '../components/TRansactions';
import Footer from '../components/Footer';
import { formatAmount } from '../util/CurrencyFormatter';

const Home = () => {

  
  useUser(); // Custom hook to fetch user data and manage user state

  const navigate = useNavigate();
  const[dashboardData, setDashoardData]=useState(null);
  const[loading,setLoading]=useState(false);

  const fetchDashboardData = async()=>{
   if(loading) return;

   setLoading(true);

    try {
     const response = await axiosConfig.get(apiEndpoints.DASHBOARD_DATA);
     if(response.status === 200){
      setDashoardData(response.data);
     }
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false);
    }
  }

  useEffect(()=>{
    fetchDashboardData();
    return () => {}
  },[]);
  return (
    <div className='flex flex-col min-h-screen'>
      <Dashboard activeMenu="Dashboard">
       <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <InfoCard
          icon={<WalletCards/>}
          label="Total Balance"
          value={`Ksh ${formatAmount(dashboardData?.totalBalance || 0)}`}
          color="bg-purple-800"
          />
          <InfoCard
          icon={<Wallet/>}
          label="Total Income"
          value={`Ksh ${formatAmount(dashboardData?.totalIncome || 0)}`}
          color="bg-green-800"
          />

          <InfoCard
          icon={<Coins/>}
          label="Total Expenses"
          
          value={`Ksh ${formatAmount(dashboardData?.totalExpenses || 0)}`}
          color="bg-red-800"
          />
        </div>
        <div className='grid cgrid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          <RecentTransactions
          transactions={dashboardData?.recentTransactions}
          onMore={()=>navigate("/expense")}
          />

          <FinanceOverview
          totalBalance={dashboardData?.totalBalance || 0}
          totalIncome={dashboardData?.totalIncome || 0}
          totalExpense={dashboardData?.totalExpenses || 0}
          />

          <TRansactions
          transactions={dashboardData?.recentFiveExpenses}
          onMore={()=>navigate("/expense")}
          type="expense"
           title="Recent Expenses"
          />
           <TRansactions
          transactions={dashboardData?.recentFiveIncomes}
          onMore={()=>navigate("/income")}
          type="income"
          title="Recent Incomes"
          />
        </div>
       </div>
        
      </Dashboard>
      
    </div>
     
  )
}

export default Home