// src/hooks/useAdminPanel.ts
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/userService";

// Type for user data
interface UserData {
  _id: string;
  name: {
    first: string;
    middle?: string;
    last: string;
  };
  email: string;
  phone: string;
  isBusiness: boolean;
  isAdmin: boolean;
  createdAt: string;
}

export const useAdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState<UserData[]>([]);
  const { userData } = useSelector((state: RootState) => state.user);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Authentication required");
        return;
      }

      const { data } = await axios.get<UserData[]>(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data?.message || "Failed to load users");
      } else if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred");
      }
      toast.error("Could not load users. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleToggleBusiness = async (userId: string, isBusiness: boolean) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.patch(
        `${BASE_URL}/users/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      // Update users locally
      setUsers(
        users.map((user) =>
          user._id === userId ? { ...user, isBusiness: !isBusiness } : user,
        ),
      );

      toast.success(`User status updated successfully`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update user status");
    }
  };

  const handleDeleteUser = async (userId: string) => {
    // Make sure the user isn't deleting themselves
    if (userId === userData?._id) {
      toast.error("You cannot delete your own account");
      return;
    }

    // Make sure the user isn't deleting another admin
    const userToDelete = users.find((user) => user._id === userId);
    if (userToDelete?.isAdmin) {
      toast.error("You cannot delete another administrator");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove user from local list
      setUsers(users.filter((user) => user._id !== userId));
      toast.success("User deleted successfully");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return {
    loading,
    error,
    users,
    userData,
    handleToggleBusiness,
    handleDeleteUser,
  };
};

export type { UserData };
