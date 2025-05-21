// src/routes/AdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useSelector((state: RootState) => state.user);

  if (!isLoggedIn) {
    toast.info("Please sign in to access this page");
    return <Navigate to="/signin" replace />;
  }

  if (!isAdmin) {
    toast.warning("This page is available only for administrators");
    return <Navigate to="/" replace />;
  }

  // User is logged in and is an admin - can see child routes
  return <Outlet />;
};

export default AdminRoute;
