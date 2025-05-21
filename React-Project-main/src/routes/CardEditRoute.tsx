// src/routes/CardEditRoute.tsx
import { Navigate, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/userService";
import { CardType } from "../types/Card";
import { Spinner } from "flowbite-react";

const CardEditRoute = () => {
  const { isLoggedIn, isAdmin, userData } = useSelector(
    (state: RootState) => state.user,
  );
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);

  useEffect(() => {
    const checkPermission = async () => {
      if (!isLoggedIn || !id || !userData?._id) {
        setHasPermission(false);
        setLoading(false);
        return;
      }

      // Admins can always edit
      if (isAdmin) {
        setHasPermission(true);
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setHasPermission(false);
          setLoading(false);
          return;
        }

        // Check if user owns the card
        const { data } = await axios.get<CardType>(`${BASE_URL}/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setHasPermission(data.user_id === userData._id);
      } catch (error) {
        console.error("Failed to check permissions:", error);
        setHasPermission(false);
      } finally {
        setLoading(false);
      }
    };

    checkPermission();
  }, [id, isLoggedIn, isAdmin, userData?._id]);

  if (!isLoggedIn) {
    toast.info("Please sign in to access this page");
    return <Navigate to="/signin" replace />;
  }

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (!hasPermission) {
    toast.warning("You don't have permission to edit this card");
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default CardEditRoute;
