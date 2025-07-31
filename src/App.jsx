import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Expense from './pages/Expense'
import Income from './pages/Income'
import Category from './pages/Category'
import Filter from './pages/Filter'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import Login from './pages/Login'
import LandingPage from './pages/LandingPage'
import AccountActivationPage from './pages/AccountActivationPage' // Add this import
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position='top-center' />
      <BrowserRouter>
        <Routes>
          {/* Landing page as the main route */}
          <Route path='/' element={<LandingPage />} />
          
          {/* Protected dashboard routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/expense" element={<ProtectedRoute><Expense /></ProtectedRoute>} />
          <Route path="/income" element={<ProtectedRoute><Income /></ProtectedRoute>} />
          <Route path="/category" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path="/filters" element={<ProtectedRoute><Filter /></ProtectedRoute>} />
          
          {/* Auth routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Account activation route - Add this */}
          <Route path="/activate" element={<AccountActivationPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App