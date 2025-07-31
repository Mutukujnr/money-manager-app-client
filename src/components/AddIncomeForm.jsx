import React, { useEffect, useState } from 'react'
import EmojiPickerPopUp from './EmojiPickerPopUp.jsx';
import InputComponent from './InputComponent.jsx';
import { Loader } from 'lucide-react';
const AddIncomeForm = ({onAddIncome, categories}) => {

  const[income, setIncome] = useState({
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
  setIncome({...income, [key]:value})
 }


 const handleAddIncome = async()=>{
  setLoading(true);
  try{
   await onAddIncome(income);
  }finally{
    setLoading(false);
  }
 }

 useEffect(()=>{
  if(categories.length > 0 && !income.categoryId){
    setIncome((prev)=>({...prev,categoryId:categories[0].id}))
  }
 },[categories,income.categoryId]);

  return (
    <div>
      <EmojiPickerPopUp
      icon={income.icon}
      onSelect={(selectedIcon)=>handleChange('icon', selectedIcon)}
      
      />
      <InputComponent
      value={income.name}
      onChange={(e) => handleChange('name', e.target.value)}
      label='income source'
      placeholder='eg salary, freelance, bonus'
      type='text'
      />

       <InputComponent
      value={income.categoryId}
      onChange={(e) => handleChange('categoryId', e.target.value)}
      label='Category'
      isSelect={true}
      options={category_options}
      
      />

       <InputComponent
      value={income.amount}
      onChange={(e) => handleChange('amount', e.target.value)}
      label='amount'
      placeholder='Enter amount'
      type='number'
      />

       <InputComponent
      value={income.date}
      onChange={(e) => handleChange('date', e.target.value)}
      label='Date'
      placeholder=''
      type='date'
      />

<div className='flex justify-end mt-6'>
  <button 
  onClick={handleAddIncome}
  disabled={loading}
  className='add-btn add-btn-fill'>

    {loading ? (
      <>
      <Loader className='animate-spin w-4 h-4'/> Adding...
      </>
      
    ):(
      <>
      Add Income
      </>
    )}
   
  </button>
</div>
      
    </div>
  )
}

export default AddIncomeForm