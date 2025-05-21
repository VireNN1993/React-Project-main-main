// src/routes/BusinessRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { toast } from "react-toastify";

const BusinessRoute = () => {
  const { isLoggedIn, isBusiness } = useSelector(
    (state: RootState) => state.user,
  );

  if (!isLoggedIn) {
    toast.info("Please sign in to access this page");
    return <Navigate to="/signin" replace />;
  }

  // Only business users can create cards
  if (!isBusiness) {
    toast.warning("This page is available only for business users");
    return <Navigate to="/" replace />;
  }

  // User is logged in and is a business user - can see child routes
  return <Outlet />;
};

export default BusinessRoute;
