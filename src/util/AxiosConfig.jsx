import axios from "axios";
import { BASE_URL } from "./ApiEndpoints";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
   
  },
});

//list of endpoints that dont require authorization header

const excludedPaths = [
  "/login",
  "/register", 
 "/status",  
 "/activate", 
 "/health", 
];

//request interceptor
axiosConfig.interceptors.request.use(
  (config) => {
   const skip = excludedPaths.some((path) => {
      return config.url.includes(path);
    })

    if(!skip) {
     const accessToken = localStorage.getItem("token")
    if(accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    }
    return config
  
  },
  (error) => {
    return Promise.reject(error);
  }
);

//response interceptor
axiosConfig.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access, e.g., redirect to login
      console.error("Unauthorized access - redirecting to login");
      window.location.href = "/login"; // Adjust the path as needed
    }
    return Promise.reject(error);
  }
);

export default axiosConfig