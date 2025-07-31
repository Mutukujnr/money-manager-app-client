import React, { useEffect, useState } from 'react'
import EmojiPickerPopUp from './EmojiPickerPopUp.jsx';
import InputComponent from './InputComponent.jsx';
import { Loader } from 'lucide-react';
const AddExpenseForm = ({onAddExpense, categories}) => {

  const[expense, setExpense] = useState({
    name: '',
    amount: '',
    date: '',
    icon: '',
    categoryId: ''
  })

  const[loading, setLoading] = useState(false);

 const category_options = categories.map(category =>({
    value: category.id,
    label: category.name
  }))

 const handleChange = (key,value) =>{
  setExpense({...expense, [key]:value})
 }


 const handleAddExpense = async()=>{
  setLoading(true);
  try{
   await onAddExpense(expense);
  }finally{
    setLoading(false);
  }
 }

 useEffect(()=>{
  if(categories.length > 0 && !expense.categoryId){
    setExpense((prev)=>({...prev,categoryId:categories[0].id}))
  }
 },[categories,expense.categoryId]);

  return (
    <div>
      <EmojiPickerPopUp
      icon={expense.icon}
      onSelect={(selectedIcon)=>handleChange('icon', selectedIcon)}
      
      />
      <InputComponent
      value={expense.name}
      onChange={(e) => handleChange('name', e.target.value)}
      label='expense source'
      placeholder='eg salary, freelance, bonus'
      type='text'
      />

       <InputComponent
      value={expense.categoryId}
      onChange={(e) => handleChange('categoryId', e.target.value)}
      label='Category'
      isSelect={true}
      options={category_options}
      
      />

       <InputComponent
      value={expense.amount}
      onChange={(e) => handleChange('amount', e.target.value)}
      label='amount'
      placeholder='Enter amount'
      type='number'
      />

       <InputComponent
      value={expense.date}
      onChange={(e) => handleChange('date', e.target.value)}
      label='Date'
      placeholder=''
      type='date'
      />

<div className='flex justify-end mt-6'>
  <button 
  onClick={handleAddExpense}
  disabled={loading}
  className='add-btn add-btn-fill'>

    {loading ? (
      <>
      <Loader className='animate-spin w-4 h-4'/> Adding...
      </>
      
    ):(
      <>
      Add Expense
      </>
    )}
   
  </button>
</div>
      
    </div>
  )
}

export default AddExpenseForm