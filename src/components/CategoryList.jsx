import React from 'react'
import { useUser } from '../Hooks/useUserHook'
import { Layers2, Pencil, PencilIcon } from 'lucide-react';

const CategoryList = ({categories, onEditCategory}) => {
  useUser();
  return (
    <div className='card p-4'>
      <div className='flex items-center justify-between mb-4'>
        <h4 className='text-lg font-semibold'> Category Sources</h4>
      </div>
       
      {categories.length === 0? (
        <p className='text-gray-500'>
          No categories added yet.
        </p>
      ):(
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {categories.map((category) => (
            <div key={category.id} 
             className='group relative p-3 gap-4 rounded-lg hover:bg-gray-100/60'>
             {/* emoji display     */}
             <div className='w-12 flex items-center justify-center text-xl text-gray-800'>
              {category.icon != null ? (
                <span className='text-2xl'>
                  <img src={category.icon} alt={category.icon} className='h-5 w-5'/>
                </span>
              ) : (
                <Layers2 className='text-purple-800' size={24}/>
              )}
             </div>
                             
             {/* category details */}
             <div className='flex-1 flex items-center justify-between'>
              <div>
                <p className='text-sm text-gray-700 font-medium'>{category.name}</p>
                <p className='text-sm text-gray-400 mt-1 capitalize'>{category.type}</p>
              </div>
              <div>
                <button 
                onClick={()=>onEditCategory(category)}
                className='text-gray-400 hover:text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity-cursor-pointer'> 
                  <Pencil size={18}/>
                </button>
              </div>
              
              
             </div>
             {/* actions buttons */}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CategoryList