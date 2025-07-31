import React, { useEffect, useState } from 'react'
import { useUser } from '../Hooks/useUserHook'
import toast from 'react-hot-toast';
import axiosConfig from '../util/AxiosConfig';
import { apiEndpoints } from '../util/ApiEndpoints';
import ExpenseList from '../components/ExpenseList';
import Dashboard from "../components/Dashboard";
import ExpenseOverview from '../components/ExpenseOverview';
import Modal from "../components/Modal";
import AddExpenseForm from '../components/AddExpenseForm ';
import DeleteAlert from '../components/DeleteAlert';
const Expense = () => {
  useUser()
  
  const[expenseData, setExpenseData] = useState([]);
  const[categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const[openAddExpenseMOdal, setOPenAddExpenseModal] = useState(false);
  const[openDeleteAlert, setOpenDeleteAlert] = useState({
    show:false,
    data:null,
  });

  const fetchExpenseData = async ()=>{
    //if(loading) return;

    setLoading(true);

    try {
     const response = await axiosConfig.get(apiEndpoints.GET_EXPENSES);
     console.log('EXPENSE DATA',response.data);
     if(response.status === 200){
     // console.log(response.data);
      setExpenseData(response.data);
     }
    } catch (error) {
      console.log('ERROR',error.response.data.message);
      toast.error('failed to fetch income data');
    }finally{
      setLoading(false);
    }
   
  }

  // fetch category types
  const fetchExpenseCategories = async() =>{
    const response = await axiosConfig.get(apiEndpoints.CATEGORIES_TYPES("expense"));
    try {
      if(response.status === 200){
        console.log("EXPENSE CATEGORIES", response.data);
        setCategories(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error('faied to fetch income categories');
    }
  }

  //save income

  const handleAddExpense= async(expenseData) => { // Accept the income data as parameter
  const{name,amount,date,icon,categoryId} = expenseData; // Use the parameter


  console.log('Received income data:', expenseData); // Add this line
  console.log('Amount value:', expenseData?.amount);

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
    const response = await axiosConfig.post(apiEndpoints.ADD_EXPENSE, {
      name,amount:Number(amount),date,icon,categoryId
    })

    if(response.status === 201){
      setOPenAddExpenseModal(false);
      toast.success('expense added successfully');
      fetchExpenseData();
      fetchExpenseCategories();
    }
  } catch (error) {
    console.log(error);
    toast.error('error adding expense');
  }
}

  const deleteExpense = async(id)=>{
  
    try {
      
      await axiosConfig.delete(apiEndpoints.DELETE_EXPENSE(id));
      setOpenDeleteAlert({show:false,data:null});
      toast.success('expense deleted successfully');
      fetchExpenseData();
    } catch (error) {
      console.log(error);
      toast.error('error deleting expense');
    }
  }

  

 const handleDownloadExpenseData = async () => {
   //const response = await axiosConfig.get(apiEndpoints.INCOME_EXCEL_DOWNLOAD);
   //console.log('DOWNLOAD DATA', response.data);
  try {
    const response = await axiosConfig.get(apiEndpoints.EXPENSE_EXCEL_DOWNLOAD, {
      responseType: 'blob'
    }
   );

    let filename = 'expense_details.xlsx';
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
    toast.error('Error downloading expense data');
  }
}

   const handleEmailExpenseData =  async() =>{
    try {
      const response = await axiosConfig.get(apiEndpoints.EXPENSE_SEND_EMAIL);

      if(response.status === 200){
         toast.success('expense data emailed successfully');
      }
     
  
    } catch (error) {
      console.log(error);
      toast.error('error sending email');
    }
    
  }

  useEffect(()=>{
    fetchExpenseData();
    fetchExpenseCategories();
  },[]);


 

  
   // Custom hook to fetch user data and manage user state
  return (
   <Dashboard activeMenu="Expense">
      <div className='my-5 mx-auto'>
       <div className='frid grid-cols-1 gap-6'>
        <div>
          {/* overview for income with line chart */}
          
          <ExpenseOverview transactions={expenseData} onAddExpense={()=>setOPenAddExpenseModal(true)}/>
          </div>
          <ExpenseList
          onDownload={handleDownloadExpenseData}
          onEmail = {handleEmailExpenseData}
          transactions = {expenseData}
           onDelete={(id)=> setOpenDeleteAlert({show:true, data:id})}
           />
           {/* add income modal */}
           <Modal
           isOpen={openAddExpenseMOdal}
           onClose={()=> setOPenAddExpenseModal(false)}
           title="Add expense">

            <AddExpenseForm
            onAddExpense={(expense) =>handleAddExpense(expense)}
            categories={categories}
            />
           </Modal>

           {/* delete income modal */}
           <Modal isOpen={openDeleteAlert.show}
           onClose={()=>setOpenDeleteAlert({show: false,data:null})}
           title="delete expense record"
           >
            <DeleteAlert content='Are you sure you want to delete this expense record?'
            onDelete={()=>deleteExpense(openDeleteAlert.data)}
            />
           </Modal>
        
       </div>
      </div>
    </Dashboard>
  )
}

export default Expense