import { Trash, Upload, User } from 'lucide-react';
import React, { useRef, useState } from 'react'

const ProfilePhotoSelector = ({image, setImage}) => {
 const inputRef = useRef(null);
 const[previewUrl, setPreviewUrl] = useState(null);

 const handleInputChange = (e) =>{
  const file = e.target.files[0];

  if(file){
    setImage(file)
   setPreviewUrl(URL.createObjectURL(file));
  }
 }

const handleRemoveImage = (e) => {
  e.preventDefault();
  setImage(null)
  setPreviewUrl(null);  
}

const onChooseFile = (e) =>{
e.preventDefault();
  inputRef.current?.click();
}


  return (
    <div className='flex justify-center mb-6'>
      <input type="file"
      accept='image/*'
      ref={inputRef}
      onChange={handleInputChange}
      className='hidden'
      />
      
      {!image ? (
        <div className='w-20 h-20 flex items-center justify-content bg-purple-100 rounded-full relative'>
          <User className='text-purple-500' size={35}/>
          <button onClick={onChooseFile} className='h-8 w-8 bg-blue text-white px-4 py-2 rounded-full absolute justify-center -bottom-1 right-1'>
          <Upload className='text-purple-500' size={15}/>
        </button>
          </div>
        
      ):(
        <div className='relative'>
          <img src={previewUrl || URL.createObjectURL(image)} alt="Profile" className='w-20 h-20 rounded-full object-cover' />
          <button onClick={handleRemoveImage} className='h-8 w-8 bg-red-500 text-white px-4 py-2 rounded-full absolute justify-center -bottom-1 right-1'>
            <Trash className='text-purple' size={15}/>
          </button>
        </div>  
      )}
    </div>
  )
}

export default ProfilePhotoSelector