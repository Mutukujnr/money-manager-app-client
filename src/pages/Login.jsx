import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast,{ Toaster } from "react-hot-toast";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import InputComponent from "../components/InputComponent.jsx";
import { validateEmail } from "../util/EmailValidation.jsx";
import axiosConfig from "../util/AxiosConfig.jsx";
import { apiEndpoints } from "../util/ApiEndpoints.jsx";
import { AppContext } from "../context/AppContext.jsx";
import { LoaderCircle, AlertTriangle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [needsActivation, setNeedsActivation] = useState(false);
  const{setUser} = useContext(AppContext); 

  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setIsLoading(true);
    setNeedsActivation(false);

    if(!email.trim()){
        setErrors("Email is required");
        setIsLoading(false);
        return;
      }
    
      // Check if email is INVALID (note the ! at the beginning)
      if(!validateEmail(email)){
        setErrors("Enter a valid email");
        setIsLoading(false);
        return;
      }
    
      if(!password.trim()){
        setErrors("Password is required");
        setIsLoading(false);
        return;
      }

      setErrors('');

      try {
       const response =  await axiosConfig.post(apiEndpoints.LOGIN, {
        email,
        password
        });

        const {user, accessToken} = response.data;
        if(accessToken){
        localStorage.setItem("token", accessToken);
        setUser(user);
        toast.success("Login successful");
        navigate("/dashboard");
        }
        
      } catch (error) {
        console.log("Login error:", error);
        
        // Check if the error is related to account activation
        if(error.response?.status === 403 || 
           error.response?.data?.message?.toLowerCase().includes('activate') ||
           error.response?.data?.message?.toLowerCase().includes('verify') ||
           error.response?.data?.message?.toLowerCase().includes('not activated')) {
          setNeedsActivation(true);
          setErrors("Your account is not activated. Please check your email and click the activation link.");
        } else if(error.response?.status === 401) {
          setErrors("Invalid email or password. Please try again.");
        } else if(error.response?.status === 404) {
          setErrors("Account not found. Please check your email or sign up.");
        } else if(error.response && error.response.data.message) {
          setErrors(error.response.data.message);
        } else {
         // Handle other errors
         console.error("Login error:", error);
         setErrors("An unexpected error occurred. Please try again.");
        }
      } finally{
        setIsLoading(false);
      }
  }

  return (
    <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
      <img
        src={assets.login_bg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover filter blur-sm"
      />

      <div className="relative z-10 w-full max-w-lg px-6">
        <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
          <h3 className="text-2xl font-semibold text-black text-center mb-2">
           Welcome Back
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Please enter your details to access your account
          </p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputComponent
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              placeholder="email@gmail.com"
              type="email"
            />

            
              <InputComponent
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                placeholder="******"
                type="password"
              />
         
            {errors && (
              <div className={`text-sm text-center p-3 rounded-lg ${
                needsActivation 
                  ? 'bg-amber-50 border border-amber-200 text-amber-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {needsActivation && (
                  <div className="flex items-center justify-center mb-2">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    <span className="font-medium">Account Activation Required</span>
                  </div>
                )}
                <p>{errors}</p>
                {needsActivation && (
                  <div className="mt-3 text-xs">
                    <p>Didn't receive the activation email?</p>
                    <p>Check your spam folder or contact support for assistance.</p>
                  </div>
                )}
              </div>
            )}

           
         <button 
  disabled={isLoading}
  className={`w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
  type="submit"
>
  {isLoading ? (
    <>
      <LoaderCircle className="animate-spin w-5 h-5"/>
      signing in...
    </>
  ) : (
    "LOGIN"
  )}
</button>
            <p className="text-sm text-slate-800 text-center mt-6">
              Don't have an Account?
              <Link
                to={"/signup"}
                className="font-medium text-primary underline hover:text-primary-dark transition-color"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;