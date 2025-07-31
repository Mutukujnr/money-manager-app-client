import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Coins, LogOut, Menu, User, X } from "lucide-react";
import { AppContext } from "../context/AppContext.jsx";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "./SideBar.jsx";
import Footer from "./Footer.jsx";

const MenuBar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false); // Fixed typo
  const dropDownRef = useRef(null);
  const { user, clearUser } = useContext(AppContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    setShowDropdown(false);
    toast.success("You have been logged out. Login to access your account");
    navigate("/");
  };

  // Close sidebar when clicking outside or on links
  const closeSideMenu = () => {
    setOpenSideMenu(false);
  };

  // Handle dropdown clicks outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (openSideMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [openSideMenu]);

  return (
    <>
      {/* Main MenuBar */}
      <div className="flex items-center justify-between gap-5 bg-white border-b border-gray-200 backdrop-blur-[2px] py-4 px-4 sm:px-7 sticky top-0 z-40">
        {/* Left side menu */}
        <div className="flex items-center gap-5">
          <button
            onClick={() => setOpenSideMenu(!openSideMenu)}
            className="block lg:hidden text-black hover:bg-gray-100 p-2 rounded transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle menu"
          >
            {openSideMenu ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">
              MoneyManager
            </span>
            <span className="text-lg font-bold text-gray-900 sm:hidden">
              MM
            </span>
          </div>
        </div>

        {/* Right side - Profile */}
        <div className="relative" ref={dropDownRef}>
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            aria-label="Profile menu"
          >
            <User className="w-5 h-5 text-purple-500" />
          </button>
          
          {/* Dropdown menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
              {/* User info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full flex-shrink-0">
                    <User className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-purple-800 truncate">
                      {user?.fullName || 'User'}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {user?.email || 'user@example.com'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Dropdown options */}
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                >
                  <LogOut className="w-4 h-4 text-gray-500" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {openSideMenu && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
            onClick={closeSideMenu}
            aria-hidden="true"
          />
          
          {/* Sidebar Container */}
          <div className="fixed top-0 left-0 w-80 max-w-[85vw] h-full bg-white z-50 lg:hidden shadow-xl transform transition-transform duration-300 ease-in-out">
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Coins className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-gray-900">MoneyManager</span>
              </div>
              <button
                onClick={closeSideMenu}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* Sidebar Content */}
            <div className="h-full overflow-y-auto pb-20">
              <SideBar activeMenu={activeMenu} onItemClick={closeSideMenu} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default MenuBar;