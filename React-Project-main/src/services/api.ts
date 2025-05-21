// src/services/api.ts
import axios from "axios";
import { toast } from "react-toastify";
import store from "../redux/store";
import { clearUser } from "../redux/slices/userSlice";

export const BASE_URL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";

// Request interceptor
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set correct auth header
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// Response interceptor
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // Token expired or invalid
      if (error.response.status === 401) {
        localStorage.removeItem("token");
        store.dispatch(clearUser());
        toast.error("Your session has expired. Please sign in again.");
      }
    }
    return Promise.reject(error);
  },
);

export default axios;
