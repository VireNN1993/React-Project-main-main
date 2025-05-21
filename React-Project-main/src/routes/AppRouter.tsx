// src/routes/AppRouter.tsx
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import CreateCard from "../pages/CreateCard/CreateCard";
import EditCard from "../pages/EditCard/EditCard";
import CardDetails from "../pages/CardDetails/CardDetails";
import FavoriteCards from "../pages/FavoriteCards/FavoriteCards";
import MyCards from "../pages/MyCards/MyCards";
import AdminPanel from "../pages/AdminPanel/AdminPanel";
import Page404 from "../pages/Page404/Page404";
import UserProfile from "../pages/UserProfile/UserProfile";
import EditProfile from "../pages/UserProfile/EditProfile";

// Route Guards
import PrivateRoute from "./PrivateRoute";
import BusinessRoute from "./BusinessRoute";
import AdminRoute from "./AdminRoute";
import CardEditRoute from "./CardEditRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/card/:id" element={<CardDetails />} />

      {/* Private routes - for logged in users */}
      <Route element={<PrivateRoute />}>
        <Route path="/favorites" element={<FavoriteCards />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Route>

      {/* Business routes - for business users */}
      <Route element={<BusinessRoute />}>
        <Route path="/create-card" element={<CreateCard />} />
        <Route path="/my-cards" element={<MyCards />} />
      </Route>

      {/* Admin routes - for admin users */}
      <Route element={<AdminRoute />}>
        <Route path="/admin-panel" element={<AdminPanel />} />
        <Route path="/my-cards" element={<MyCards />} />
      </Route>

      {/* Card edit route - for both business owners and admins */}
      <Route element={<CardEditRoute />}>
        <Route path="/edit-card/:id" element={<EditCard />} />
      </Route>

      {/* 404 page - for all other routes */}
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
};

export default AppRouter;
