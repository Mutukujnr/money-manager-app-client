import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'

const InputComponent = ({label, value, onChange, placeholder, type, isSelect, options}) => {

const[showPassword, setShowPassword] = useState(false);

const togglePassword = ()=>{
  setShowPassword(!showPassword);
}

  return (
    <div className='mb-4'> 
      <label className='block text-[13px] text-slate-800 mb-1'>{label}</label>
      <div className='relative'> 
         {isSelect ? (
          <select
          className='w-full bg-transparent outline:none border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
          value={value}
          onChange={(e)=>onChange(e)}
          >
            {options.map((option)=>(
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}

         </select>): (
           <input 
          className='w-full bg-transparent outline-none border border-gray-300 rounded-md py-2 px-3 pr-10 text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
          type={type === 'password' ? (showPassword ? 'text' : 'password'): type}
          placeholder={placeholder}
          value={value}
          onChange={(e)=>onChange(e)}
          />
         )}

          {type === 'password' && (
            <span className='absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer'>
              {showPassword ? (
                <Eye 
                size={20} 
                className='text-purple'
                 onClick={togglePassword}
                  />
              ): (
                <EyeOff 
                size={20} 
                className='text-slate-400' 
                onClick={togglePassword}
                />
              )}
            </span>
          )}
      </div>
    </div>
  )
}

export default InputComponent