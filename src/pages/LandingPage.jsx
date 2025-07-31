import React from 'react';
import { WalletCards, Wallet, Coins, BarChart3, Shield, Smartphone, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = ({ onGetStarted, onLogin }) => {
  const handleGetStarted = () => {
    if (onGetStarted) onGetStarted();
  };

  const handleLogin = () => {
    if (onLogin) onLogin();
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">MoneyManager</span>
          </div>
          <div className="flex items-center space-x-8">
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              About
            </Link>
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact Us
            </Link>
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Sign In
            </Link>
            <Link  to={'/login'}
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Take Control of Your
            <span className="text-blue-600 block">Financial Future</span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Track expenses, manage budgets, and achieve your financial goals with our intuitive money management platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button 
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <span>Start Tracking Your Finances</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <WalletCards className="w-8 h-8 text-blue-600" />
                  <span className="text-2xl font-bold text-gray-900">$12,450</span>
                </div>
                <p className="text-gray-600">Total Balance</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="w-8 h-8 text-green-600" />
                  <span className="text-2xl font-bold text-gray-900">$8,220</span>
                </div>
                <p className="text-gray-600">Total Income</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <Coins className="w-8 h-8 text-red-600" />
                  <span className="text-2xl font-bold text-gray-900">$3,770</span>
                </div>
                <p className="text-gray-600">Total Expenses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-xl text-gray-600 mb-16 max-w-2xl mx-auto">
            Simple, powerful tools to help you take control of your finances
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-8 h-8 text-blue-600" />}
              title="Smart Analytics"
              description="Get insights into your spending patterns with detailed reports and charts."
            />
            <FeatureCard
              icon={<Shield className="w-8 h-8 text-green-600" />}
              title="Secure & Private"
              description="Your financial data is protected with high-level security."
            />
            <FeatureCard
              icon={<Smartphone className="w-8 h-8 text-purple-600" />}
              title="Mobile Ready"
              description="Access your finances anywhere with our responsive web application."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users who trust MoneyManager with their finances.
          </p>
          <Link
            to={'/login'} 
           
            className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg"
          >
           Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
     <Footer/>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="w-16 h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-xl font-semibold text-gray-900 mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;