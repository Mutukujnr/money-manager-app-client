import React from 'react';
import MenuBar from './MenuBar';
import { AppContext } from '../context/AppContext';
import SideBar from './SideBar';
import Footer from './Footer';

const Dashboard = ({ children, activeMenu }) => {
  const { user } = React.useContext(AppContext);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar - Always visible */}
      <MenuBar activeMenu={activeMenu} />

      {/* Main Content Area - Only show if user is authenticated */}
      {user ? (
        <div className="flex flex-1">
          {/* Desktop Sidebar - Hidden on mobile, MenuBar handles mobile sidebar */}
          <aside className="hidden lg:block w-64 bg-white border-r border-gray-200 shadow-sm">
            <SideBar activeMenu={activeMenu} />
          </aside>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 sm:px-6 lg:px-8">
              {children}
            </div>
            
            {/* Footer inside main content area */}
            
          </main>
        </div>
      ) : (
        /* Loading or unauthenticated state */
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;