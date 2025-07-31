import React, { useEffect, useState } from 'react'
import InputComponent from "./InputComponent.jsx";
import { HandHelping, LoaderCircle } from 'lucide-react';
import EmojiPickerPopUp from './EmojiPickerPopUp.jsx';

const AddCategoryForm = ({onAddCategory, initialCategory, isEditing}) => {

  const[loading, setLoading] = useState(false);

  const[category, setCategory] = useState({
    name:"",
    type: "",
    icon: ""
  })

  const categoryTypes = [
    {value: "income", label:"income"},
    {value: "expense", label:"expense"}
  ]

  const handleChange = (key, value) => {
    setCategory({...category, [key]:value})
  }

  const handleSubmit = async() => {
    setLoading(true);
    try{
      await  onAddCategory(category);
    }finally{
      setLoading(false)
    }

   
  }

useEffect(()=>{
  if(isEditing && initialCategory){
    setCategory(initialCategory);
  }else{
    setCategory({name: '', type: 'income', icon: ''});
  }
}, [isEditing, initialCategory]);

  return (
    <div className='p-4'>
      <EmojiPickerPopUp
      icon={category.icon}
      onSelect={(selectedIcon)=>handleChange("icon", selectedIcon)}
      />

       <InputComponent
       value={category.name}
       onChange={({target})=>handleChange("name", target.value)}
       label="Category Name"
       placeholder="add category"
       type="text"
       />

       <InputComponent
       label="Category Type"
       value={category.type}
   onChange={({target})=>handleChange("type", target.value)}
       isSelect={true}
       options={categoryTypes}
       />

       <div className='flex justify-end mt-6'>
        <button 
        disabled={loading}
       
        onClick={handleSubmit} type='submit' className='add-btn add-btn-fill'>
           {loading ? (
          <>
          <LoaderCircle className='w-4 h-4 animate-spin'/> 
          {isEditing ? "Updating...": "Adding..."}
          </>
        ):(
          <>
          {isEditing ? "Update Category" : "Add Category"}
          </>
        )}
        </button>
       </div>
    </div>
  )
}

export default AddCategoryForm