import React, { useEffect, useState } from 'react'
import { useUser } from '../Hooks/useUserHook'
import { apiEndpoints } from '../util/ApiEndpoints';
import axiosConfig from '../util/AxiosConfig';
import toast from 'react-hot-toast';
import Dashboard from "../components/Dashboard";
import IncomeList from '../components/IncomeList';
import Modal from "../components/Modal";
import { Plus } from 'lucide-react';
import AddIncomeForm from '../components/AddIncomeForm';
import DeleteAlert from '../components/DeleteAlert';
import IncomeOverview from '../components/IncomeOverview';

const Income = () => {
  useUser(); // Custom hook to fetch user data and manage user state

  const[incomeData, setIncomeData] = useState([]);
  const[categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const[openAddIncomeMOdal, setOPenAddIncomeModal] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  const fetchIncomeData = async ()=>{
    //if(loading) return;

    setLoading(true);

    try {
     const response = await axiosConfig.get(apiEndpoints.GET_INCOMES);
     // console.log(response.data);
     if(response.status === 200){
     // console.log(response.data);
      setIncomeData(response.data);
     }
    } catch (error) {
      console.log('ERROR',error.response.data.message);
      toast.error('failed to fetch income data');
    }finally{
      setLoading(false);
    }
   
  }

  // fetch category types
  const fetchIncomeCategories = async() =>{
    const response = await axiosConfig.get(apiEndpoints.CATEGORIES_TYPES("income"));
    try {
      if(response.status === 200){
        console.log("INCOME CATEGORIES", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('faied to fetch income categories');
    }
  }

  //save income

  const handleAddIncome = async(incomeData) => { // Accept the income data as parameter
  const{name,amount,date,icon,categoryId} = incomeData; // Use the parameter


  console.log('Received income data:', incomeData); // Add this line
  console.log('Amount value:', incomeData?.amount);

  if(!amount || Number(amount) <= 0){
    toast.error('Enter valid amount');
    return;
  }

  if(!name.trim()){
    toast.error('name is required');
    return;
  }

  if(!date){
    toast.error('date is required');
    return; // Add missing return here
  }

  const today = new Date().toISOString().split('T')[0];
  if(date > today){
    toast.error('date cannot be in the future');
    return;
  }

  if(!categoryId){
    toast.error('category is required');
    return;
  }

  try {
    const response = await axiosConfig.post(apiEndpoints.ADD_INCOME, {
      name,amount:Number(amount),date,icon,categoryId
    })

    if(response.status === 201){
      setOPenAddIncomeModal(false);
      toast.success('income added successfully');
      fetchIncomeData();
      fetchIncomeCategories();
    }
  } catch (error) {
    console.log(error);
    toast.error('error adding income');
  }
}

  const deleteIncome = async(id)=>{
  
    try {
      
      await axiosConfig.delete(apiEndpoints.DELETE_INCOME(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success('income deleted successfully');
      fetchIncomeData();
    } catch (error) {
      console.log(error);
      toast.error('error deleting income');
    }
  }

  

 const handleDownloadIncomeData = async () => {
   //const response = await axiosConfig.get(apiEndpoints.INCOME_EXCEL_DOWNLOAD);
   //console.log('DOWNLOAD DATA', response.data);
  try {
    const response = await axiosConfig.get(apiEndpoints.INCOME_EXCEL_DOWNLOAD, {
      responseType: 'blob'
    }
   );

    let filename = 'income_details.xlsx';
    const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(downloadUrl);
    toast.success("Download successful");
  } catch (error) {
    console.log(error);
    toast.error('Error downloading income data');
  }
}

   const handleEmailIncomeData =  async() =>{
    try {
      const response = await axiosConfig.get(apiEndpoints.INCOME_SEND_EMAIL);

      if(response.status === 200){
         toast.success('income data emailed successfully');
      }
     
  
    } catch (error) {
      console.log(error);
      toast.error('error sending email');
    }
    
  }

  useEffect(()=>{
    fetchIncomeData();
    fetchIncomeCategories();
  },[]);


 

  
   // Custom hook to fetch user data and manage user state
  return (
   <Dashboard activeMenu="Income">
      <div className='my-5 mx-auto'>
       <div className='frid grid-cols-1 gap-6'>
        <div>
          {/* overview for income with line chart */}
          
          <IncomeOverview transactions={incomeData} onAddIncome={()=>setOPenAddIncomeModal(true)}/>
          </div>
          <IncomeList
          onDownload={handleDownloadIncomeData}
          onEmail = {handleEmailIncomeData}
          transactions = {incomeData}
           onDelete={(id)=> setOpenDeleteAlert({show:true, data:id})}
           />
           {/* add income modal */}
           <Modal
           isOpen={openAddIncomeMOdal}
           onClose={()=> setOPenAddIncomeModal(false)}
           title="Add income">

            <AddIncomeForm
            onAddIncome={(income) =>handleAddIncome(income)}
            categories={categories}
            />
           </Modal>

           {/* delete income modal */}
           <Modal isOpen={openDeleteAlert.show}
           onClose={()=>setOpenDeleteAlert({show: false,data:null})}
           title="delete income"
           >
            <DeleteAlert content='Are you sure you want to delete this income record?'
            onDelete={()=>deleteIncome(openDeleteAlert.data)}
            />
           </Modal>
        
       </div>
      </div>
    </Dashboard>
  )
}

export default Income