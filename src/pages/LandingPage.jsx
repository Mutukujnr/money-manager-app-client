import React from 'react';
import { WalletCards, Wallet, Coins, BarChart3, Shield, Smartphone, ArrowRight, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';

const LandingPage = ({ onGetStarted, onLogin }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleGetStarted = () => {
    if (onGetStarted) onGetStarted();
  };

  const handleLogin = () => {
    if (onLogin) onLogin();
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white min-h-screen">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 py-4 border-b border-gray-200 relative">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Coins className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-gray-900">MoneyManager</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              About
            </Link>
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Contact Us
            </Link>
            <Link to={'/login'} 
              onClick={handleLogin}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm lg:text-base"
            >
              Sign In
            </Link>
            <Link to={'/login'}
              onClick={handleGetStarted}
              className="bg-blue-600 text-white px-4 lg:px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm lg:text-base"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50">
            <div className="px-4 py-4 space-y-4">
              <Link to={'/login'} 
                onClick={handleLogin}
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                About
              </Link>
              <Link to={'/login'} 
                onClick={handleLogin}
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Contact Us
              </Link>
              <Link to={'/login'} 
                onClick={handleLogin}
                className="block text-gray-600 hover:text-gray-900 transition-colors py-2"
              >
                Sign In
              </Link>
              <Link to={'/login'}
                onClick={handleGetStarted}
                className="block bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
            Take Control of Your
            <span className="text-blue-600 block mt-2">Financial Future</span>
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 sm:mb-12 max-w-3xl mx-auto px-4">
            Track expenses, manage budgets, and achieve your financial goals with our intuitive money management platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
            <button 
              onClick={handleGetStarted}
              className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
            >
              <span>Start Tracking Your Finances</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Dashboard Preview */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <WalletCards className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">$12,450</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Total Balance</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 sm:p-6 rounded-lg sm:rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">$8,220</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Total Income</p>
              </div>
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-4 sm:p-6 rounded-lg sm:rounded-xl sm:col-span-2 lg:col-span-1">
                <div className="flex items-center justify-between mb-3">
                  <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
                  <span className="text-lg sm:text-2xl font-bold text-gray-900">$3,770</span>
                </div>
                <p className="text-sm sm:text-base text-gray-600">Total Expenses</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-12 sm:mb-16 max-w-2xl mx-auto px-4">
            Simple, powerful tools to help you take control of your finances
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />}
              title="Smart Analytics"
              description="Get insights into your spending patterns with detailed reports and charts."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />}
              title="Secure & Private"
              description="Your financial data is protected with high-level security."
            />
            <FeatureCard
              icon={<Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" />}
              title="Mobile Ready"
              description="Access your finances anywhere with our responsive web application."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
            Ready to get started?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 mb-6 sm:mb-8 px-4">
            Join thousands of users who trust MoneyManager with their finances.
          </p>
          <Link
            to={'/login'} 
            className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-blue-700 transition-colors text-base sm:text-lg"
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
  <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gray-50 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
      {icon}
    </div>
    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3 sm:mb-4">{title}</h3>
    <p className="text-sm sm:text-base text-gray-600">{description}</p>
  </div>
);

export default LandingPage;