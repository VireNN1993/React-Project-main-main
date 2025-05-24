// src/components/Navbar.tsx
import { Navbar, NavbarCollapse, NavbarToggle, Button } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { clearUser } from "../redux/slices/userSlice";
import { setSearchTerm } from "../redux/slices/cardsSlice";
import { FaMoon, FaSun, FaSearch, FaUser } from "react-icons/fa";
import { useCallback, useState } from "react";
import axios from "axios";
import NavbarLinks from "./NavbarLinks";

const AppNavbar = () => {
  const { isLoggedIn, isBusiness, isAdmin, userData } = useSelector(
    (state: RootState) => state.user,
  );
  const { searchTerm } = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  // Handle logout
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["x-auth-token"];
    dispatch(clearUser());
    navigate("/");
  }, [dispatch, navigate]);

  // Handle search
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearchTerm(e.target.value));

      if (window.location.pathname !== "/") {
        navigate("/");
      }
    },
    [dispatch, navigate],
  );

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <Navbar
      fluid
      rounded
      className="border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-900"
    >
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-lg font-bold text-white">
            BC
          </div>
          <span className="text-xl font-semibold whitespace-nowrap dark:text-white">
            BussinesCards
          </span>
        </Link>
      </div>

      {/* Search bar - Hidden on mobile */}
      <div className="mx-4 hidden max-w-md flex-grow md:block">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch className="text-gray-400" size={16} />
          </div>
          <input
            type="search"
            placeholder="Search cards..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 md:order-2">
        {/* Dark mode toggle */}
        <Button color="gray" pill onClick={toggleDarkMode} size="sm">
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            {/* User info */}
            <div className="hidden items-center gap-2 md:flex">
              <div className="h-8 w-8 overflow-hidden rounded-full">
                <img
                  src={
                    userData?.image?.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Hello, {userData?.name?.first || "User"}
              </span>
            </div>

            {/* Profile link */}
            <Link
              to="/profile"
              className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              <FaUser size={12} />
              <span className="hidden sm:inline">Profile</span>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="rounded-lg px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/signin"
              className="rounded-lg px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="rounded-lg bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </div>
        )}

        <NavbarToggle />
      </div>

      {/* Collapsible menu */}
      <NavbarCollapse>
        <NavbarLinks
          isLoggedIn={isLoggedIn}
          isBusiness={isBusiness}
          isAdmin={isAdmin}
        />

        {/* Mobile search bar */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="text-gray-400" size={16} />
            </div>
            <input
              type="search"
              placeholder="Search cards..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Mobile user info */}
        {isLoggedIn && (
          <div className="mt-3 border-t border-gray-200 pt-3 md:hidden dark:border-gray-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full">
                <img
                  src={
                    userData?.image?.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  {userData?.name?.first} {userData?.name?.last}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {userData?.email}
                </p>
              </div>
            </div>
          </div>
        )}
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavbar;
