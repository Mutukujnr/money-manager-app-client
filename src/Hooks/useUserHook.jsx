import {useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import axiosConfig from "../util/AxiosConfig";
import { useNavigate } from "react-router-dom";
import { apiEndpoints } from "../util/ApiEndpoints";

export const useUser = () => {
  const {user, setUser, clearUser} = useContext(AppContext );
  const navigate = useNavigate();

  useEffect(() => {
    if(user) {
      /// Perform any side effects or data fetching related to the user
      //console.log("User data has been updated:", user);
      return
    }

    let isMounted = true;
    const fetchUserInfo = async () => {
      try {
      const response =   await axiosConfig.get(apiEndpoints.GET_USER_INFO);
       // const data = await response.json();
        if (isMounted && response.data) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);

        if (isMounted) {
          clearUser();
          // Optionally, you can redirect to login if user data is not available
          navigate("/login");
        }   
      }
    } 
    fetchUserInfo();
    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted component
    };
    
  }, [setUser, clearUser, navigate]);

}