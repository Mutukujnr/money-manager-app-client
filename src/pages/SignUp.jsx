import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import { assets } from "../assets/assets.js";
import InputComponent from "../components/InputComponent.jsx";
import { validateEmail } from "../util/EmailValidation.jsx";
import axiosConfig from "../util/AxiosConfig.jsx";
import { apiEndpoints } from "../util/ApiEndpoints.jsx";
import { LoaderCircle, Mail, CheckCircle } from "lucide-react";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";
import { uploadProfileImage } from "../util/upload-profile-image.js";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [accountCreated, setAccountCreated] = useState(false);

  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  let profileImageUrl = null;
  setIsLoading(true);
  setErrors(''); // Clear previous errors first

  // Basic validation
  if(!fullName.trim()){
    setErrors("Fullname is required");
    setIsLoading(false);
    return;
  }

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

  try {
    //upload image if provided
    if(profileImage){
      const uploadResponse = await uploadProfileImage(profileImage);
      profileImageUrl = uploadResponse; // Get the URL of the uploaded image

    }
    // Add await here
    const response = await axiosConfig.post(apiEndpoints.SIGNUP, {
      fullName,
      email,
      password,
      profileImageUrl: profileImageUrl || "" // Use the uploaded image URL or an empty string if no image
    });

    if(response.status === 201){
      setAccountCreated(true);
      toast.success("Account created successfully! Please check your email.");
    }
  } catch (error) {
    console.log('Signup error:', error);
    
    // Handle different error scenarios
    if(error.response?.status === 400){
      setErrors("User already exists or invalid data");
    } else if(error.response?.status === 500){
      setErrors("Server error. Please try again later");
    } else {
      setErrors("Something went wrong. Please try again");
    }
  } finally {
    setIsLoading(false);
  }
};

  // Show success page after account creation
  if (accountCreated) {
    return (
      <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
        <img
          src={assets.login_bg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover filter blur-sm"
        />

        <div className="relative z-10 w-full max-w-lg px-6">
          <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Account Created Successfully!
              </h3>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-3">
                  <Mail className="w-6 h-6 text-blue-600 mr-2" />
                  <span className="text-blue-800 font-medium">Activation Required</span>
                </div>
                <p className="text-sm text-blue-700 leading-relaxed">
                  We've sent an activation link to <span className="font-semibold">{email}</span>. 
                  Please check your email and click the activation link to verify your account.
                </p>
              </div>
              
              <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-800 mb-2">Next Steps:</h4>
                <ol className="text-sm text-gray-600 space-y-1">
                  <li>1. Check your email inbox</li>
                  <li>2. Look for an email from our team</li>
                  <li>3. Click the activation link in the email</li>
                  <li>4. Return here to sign in</li>
                </ol>
              </div>
              
              <p className="text-xs text-gray-500 mb-6">
                Didn't receive the email? Check your spam folder or contact support.
              </p>
              
              <button
                onClick={() => navigate('/login')}
                className="w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                Go to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    );
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
            Create an Account
          </h3>
          <p className="text-sm text-slate-700 text-center mb-8">
            Start tracking your spendings by joining us
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-6">
              <ProfilePhotoSelector  image = {profileImage} setImage={setProfileImage}/>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                <InputComponent
                  value={fullName}
                  onChange={(e)=>setFullName(e.target.value)}
                  label="Full Name"
                  placeholder = "Enter full name"
                  type="text"
                />
                <InputComponent
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  label="Email"
                  placeholder = "email@gmail.com"
                  type="text"
                />

               <div className="col-span-2">
                 <InputComponent
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  label="Password"
                  placeholder = "******"
                  type="password"
                />
               </div>
            </div>
            {errors && (
              <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                {errors}
              </p>
            )}

         <button 
  disabled={isLoading}
  className={`w-full py-3 text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
  type="submit"
>
  {isLoading ? (
    <>
      <LoaderCircle className="animate-spin w-5 h-5"/>
      Signing up...
    </>
  ) : (
    "SIGN UP"
  )}
</button>
            <p className="text-sm text-slate-800 text-center mt-6">
              Already have an Account?
              <Link to={"/login"} className="font-medium text-primary underline hover:text-primary-dark transition-color">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;