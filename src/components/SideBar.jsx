import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { User } from 'lucide-react';
import { SIDE_BAR_DATA } from '../assets/sidebardata';
import { useNavigate } from 'react-router-dom';

const SideBar = ({ activeMenu, onItemClick }) => {
  const { user } = useContext(AppContext);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    // Close mobile menu when navigation happens
    if (onItemClick) {
      onItemClick();
    }
  };

  return (
    <div className='w-full lg:w-64 h-full lg:h-[calc(100vh-61px)] bg-white border-r border-gray-200 lg:border-gray-200/50 p-5 lg:sticky lg:top-[61px] z-20 overflow-y-auto'>
      {/* User Profile Section */}
      <div className='flex flex-col items-center justify-center gap-3 mt-3 mb-7 pb-6 border-b border-gray-100 lg:border-none'>
        {user?.profileImageUrl ? (
          <img 
            src={user.profileImageUrl} 
            alt="Profile"
            className='w-16 h-16 lg:w-20 lg:h-20 bg-slate-400 rounded-full object-cover border-4 border-purple-100' 
          />
        ) : (
          <div className='w-16 h-16 lg:w-20 lg:h-20 bg-purple-100 rounded-full flex items-center justify-center'>
            <User className='w-8 h-8 lg:w-10 lg:h-10 text-purple-600' />
          </div>
        )}
        <h5 className='text-gray-950 font-medium leading-6 text-center px-2'>
          {user?.fullName || 'User Name'}
        </h5>
      </div>

      {/* Navigation Menu */}
      <nav className='space-y-2'>
        {SIDE_BAR_DATA.map((item, index) => (
          <button 
            key={`menu_${index}`} 
            onClick={() => handleNavigation(item.path)}
            className={`w-full flex items-center gap-4 text-[15px] py-3 px-4 lg:px-6 rounded-lg transition-all duration-200 font-medium ${
              activeMenu === item.label 
                ? 'bg-purple-600 text-white shadow-lg transform scale-[1.02]' 
                : 'text-gray-600 hover:bg-purple-50 hover:text-purple-700 hover:scale-[1.01]'
            }`}
          >
            <item.icon className={`w-5 h-5 flex-shrink-0 ${
              activeMenu === item.label ? 'text-white' : 'text-gray-500'
            }`} />
            <span className='text-left'>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Footer for mobile view */}
      <div className='lg:hidden mt-8 pt-6 border-t border-gray-100'>
        <p className='text-xs text-gray-400 text-center'>
          MoneyManager v1.0
        </p>
      </div>
    </div>
  )
}

export default SideBar