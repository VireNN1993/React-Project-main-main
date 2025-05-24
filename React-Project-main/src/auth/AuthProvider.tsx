// src/auth/AuthProvider.tsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { UserType } from "../types/User";
import axios from "axios";
import { BASE_URL } from "../services/userService";
import { toast } from "react-toastify";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return;
        }

        try {
          // Decode token
          const decoded = jwtDecode<UserType & { _id: string }>(token);

          // Use type assertion to add JWT fields
          const jwtDecoded = decoded as UserType & {
            exp?: number;
            iat?: number;
            _id: string;
          };

          // Check token expiration
          const currentTime = Date.now() / 1000;

          if (jwtDecoded.exp && jwtDecoded.exp < currentTime) {
            localStorage.removeItem("token");
            return;
          }

          // Set the correct auth header
          axios.defaults.headers.common["x-auth-token"] = token;

          // Fetch complete user data from server
          try {
            const { data } = await axios.get(
              `${BASE_URL}/users/${jwtDecoded._id}`,
            );

            // Update user state in Redux
            dispatch(setUser(data));
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
          } catch (error) {
            toast.error("Error loading user details");
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          localStorage.removeItem("token");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // Silent fail for auth initialization
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
