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
    <Navbar fluid rounded className="shadow-md">
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

      {/* Search bar */}
      <div className="mx-4 hidden max-w-md flex-grow md:block">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <FaSearch color="gray" />
          </div>
          <input
            type="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 md:order-2">
        {/* Toggle dark mode button */}
        <Button color="gray" pill onClick={toggleDarkMode} className="p-2">
          {darkMode ? <FaSun /> : <FaMoon />}
        </Button>

        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            {/* Profile image */}
            <Link to="/profile" className="flex items-center gap-2">
              <div className="hidden h-8 w-8 overflow-hidden rounded-full md:block">
                <img
                  src={
                    userData?.image?.url ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                  }
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="hidden text-sm text-gray-700 md:inline dark:text-gray-300">
                Hello, {userData?.name?.first || "User"}
              </span>
            </Link>

            {/* Profile link */}
            <Link
              to="/profile"
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <FaUser size={12} />
              <span className="hidden md:inline">Profile</span>
            </Link>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="text-sm text-red-600 hover:underline"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Link
              to="/signin"
              className="text-sm text-blue-600 hover:underline"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </>
        )}
        <NavbarToggle />
      </div>

      <NavbarCollapse>
        <NavbarLinks
          isLoggedIn={isLoggedIn}
          isBusiness={isBusiness}
          isAdmin={isAdmin}
        />

        {/* Search bar for mobile */}
        <div className="mt-3 md:hidden">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch color="gray" />
            </div>
            <input
              type="search"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full rounded-lg border border-gray-300 bg-gray-50 p-2 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
          </div>
        </div>
      </NavbarCollapse>
    </Navbar>
  );
};

export default AppNavbar;
