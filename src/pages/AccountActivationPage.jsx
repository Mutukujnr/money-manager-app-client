import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2, Mail, ArrowRight } from 'lucide-react';
import axiosConfig from '../util/AxiosConfig';
import { apiEndpoints } from '../util/ApiEndpoints';

const AccountActivationPage = () => {
  const [activationStatus, setActivationStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Get the token from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (!token) {
      setActivationStatus('error');
      setMessage('No activation token found in the URL');
      return;
    }

    // Call your activation endpoint
    activateAccount(token);
  }, []);

  const activateAccount = async (token) => {
    try {
      const response = await axiosConfig.get(apiEndpoints.ACTIVATE_ACCOUNT(token));

      if (response.status === 200) {
        //const result = await response.;
        setActivationStatus('success');
        setMessage(response.data.message || 'Account activated successfully!');
      } else {
        const errorResult = response.data.message || 'Failed to activate account. Please try again.';
        setActivationStatus('error');
        setMessage(errorResult);
      }
    } catch (error) {
      console.log(error);
      setActivationStatus('error');
      setMessage('Failed to activate account. Please try again later.');
    }
  };

  const handleGoToLogin = () => {
    navigate('/login');
  };

  const handleResendActivation = () => {
    // You can create a resend activation page or redirect to signup
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-gray-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Activation</h1>
          <p className="text-gray-600">Activating your account so you can sign in</p>
        </div>

        {/* Loading State */}
        {activationStatus === 'loading' && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-600 font-medium">Activating your account...</p>
            <p className="text-sm text-gray-500 mt-2">This will only take a moment</p>
          </div>
        )}

        {/* Success State */}
        {activationStatus === 'success' && (
          <div className="text-center py-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">🎉 Welcome Aboard!</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 font-semibold mb-2">Account Successfully Activated!</p>
              <p className="text-green-700 text-sm">Your account is now active and ready to use. You can now sign in and access all features.</p>
            </div>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center justify-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Email verified
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Account activated
              </div>
              <div className="flex items-center justify-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                Ready to login
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleGoToLogin}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In to Your Account
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
              
              <p className="text-sm text-gray-500 mt-3">
                You will be redirected to the login page where you can now access your account
              </p>
            </div>
          </div>
        )}

        {/* Error State */}
        {activationStatus === 'error' && (
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Activation Failed</h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm">{message}</p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={handleResendActivation}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200"
              >
                Request New Activation Link
              </button>
              <p className="text-xs text-gray-500">
                Note: You cannot sign in until your account is activated
              </p>
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-500 text-center">
            Having trouble? Contact our support team for assistance.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountActivationPage;