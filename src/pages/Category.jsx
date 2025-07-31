import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import { useUser } from "../Hooks/useUserHook";
import { Plus } from "lucide-react";
import CategoryList from "../components/CategoryList";
import axiosConfig from "../util/AxiosConfig";
import { apiEndpoints } from "../util/ApiEndpoints";
import toast from "react-hot-toast";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";
import Footer from "../components/Footer";

const Category = () => {
 useUser();

 const[loading, setLoading] = useState(false);
 const[categories, setCategories] = useState([]);
 const[openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
 const[openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
 const[categoryToEdit, setCategoryToEdit] = useState(null);
 const[selectedCategory, setSelectedCategory] = useState(null);

 const fetchCategories = async() => {
  
   setLoading(true);
    // Fetch categories from the API
    
   try {

   const result = await axiosConfig.get(apiEndpoints.GET_ALL_CATEGORIES);
   
    
      setCategories(result.data);
      console.log("Categories fetched successfully:", categories);

    
   } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to fetch categories. Please try again later.");
    
   }finally {
     setLoading(false);
   }
 }

useEffect(() => { 
  fetchCategories();
}, []);  


 const handleAddCategory = async(category) => {

  const {name, type, icon} = category;
  if(!name.trim()){
    toast.error("category name is required");
    return
  }

  const isDuplicate = categories.some((category) =>{
   return category.name.toLowercase() === name.trim().toLowercase();
 });

 if(isDuplicate){
  toast.error('A category with that name already exists!');
 }

 


  
  try {
    const result = await axiosConfig.post(apiEndpoints.ADD_CATEGORY, {name, type, icon});
  if(result.status === 201) {
    toast.success('category added successfully');
    setOpenAddCategoryModal(false);
    fetchCategories();
  }
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "error adding category");
    setOpenAddCategoryModal(false);
    fetchCategories();
    
  }

 }

 const handleEditCategory = (categoryToEdit) =>{

  setSelectedCategory(categoryToEdit);
  setOpenEditCategoryModal(true);
 }

 const handleUpdateCategory = async(updateCategory) =>{
  const {id, name, type, icon} = updateCategory;
  if(!name.trim()){
    toast.error("Category name is required");
  } 
  
   if(!id){
    toast.error("Category ID name is missing");
  }
  try {
    await axiosConfig.put(apiEndpoints.UPDATE_CATEGORY(id), {name, type, icon});
    setOpenEditCategoryModal(false);
    setSelectedCategory(null);
    toast.success("category updated successfully");
    fetchCategories();
  } catch (error) {
    console.log(error.response.data.message || error.message);
    toast.error(error.response.data.message || "failed to update the category");
  }
 }

  return (
    // Custom hook to fetch user data and manage user state;
    
      <div className="flex flex-col min-h-screen">
      <Dashboard activeMenu="Category">
        <div className="my-5 mx-auto">
          {/* button to add category */}
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-semibold">All Categories</h2>
            <button onClick={()=> setOpenAddCategoryModal(true)}
             className="flex items-center gap-1 px-3 py-2 card-btn text-green-500 flex items-center rounded hover:bg-green-700 transition">
              <Plus size={15} />
              <span>Add Category</span>
            </button>
          </div>

          {/* category list */}
          <CategoryList categories={categories} onEditCategory={handleEditCategory}/>

          {/* adding category modal */}
          <Modal 
          isOpen={openAddCategoryModal}
          onClose={()=>setOpenAddCategoryModal(false)}
          title="Add Category">
            <AddCategoryForm onAddCategory={handleAddCategory}/>
          </Modal>

          {/* edit category modal */}
          <Modal
          
          isOpen={openEditCategoryModal}
          onClose={()=>{
            setOpenEditCategoryModal(false);
             setSelectedCategory(null)
            }}
          title="edit category"
          >
            <AddCategoryForm
            onAddCategory={handleUpdateCategory}
            isEditing ={true}
            initialCategory={selectedCategory}
            />
          </Modal>
        </div>
       
      </Dashboard>
      
          
         
          </div>
    );
  };

export default Category;
