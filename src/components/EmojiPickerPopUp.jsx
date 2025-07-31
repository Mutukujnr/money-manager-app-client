import EmojiPicker from 'emoji-picker-react';
import { Image, X } from 'lucide-react';
import React, { useState } from 'react'

function EmojiPickerPopUp({icon, onSelect}) {

  const[isOPen, setIsOpen] = useState(false);

  const handleEmojiClick = (emoji) => {
    onSelect(emoji?.imageUrl || "");
    setIsOpen(false);
  }
  return (
    <div className='flex flex-col md:flex-row items-start gap-5 mb-6'>
      <div
      onClick={()=>setIsOpen(true)}
      className='flex items-center gap-4 cursor-pointer'>
        <div className='w-12 h-12 flex items-center justify-center text-2xl br-purple-50 text-purple-500 rounded-lg'>
          {icon ? (
            <img src={icon} alt='icon' className='w-12 h-12'/>
          ):(
            <Image/>
          )}
          
        </div>
        <p>{icon ? "Change Icon": "Pick Icon"}</p>
          </div>
        {isOPen &&(
          <div className='relative'>
            <button 
            onClick={()=> setIsOpen(false)}
            className='w-7 h-t flex items-center justify-center bg-white border border-gray-200 rounded-full absolute -top-2 -right-2 z-10 cursor-pointer'>
              <X/>
             
            </button>
             <EmojiPicker 
              onEmojiClick={handleEmojiClick}
              open={isOPen}/>
          </div>
        )}
     
    </div>
  )
}

export default EmojiPickerPopUp