// src/components/Footer.tsx
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { FaHeart, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  const { isLoggedIn, isBusiness, isAdmin } = useSelector(
    (state: RootState) => state.user,
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="mb-4 flex items-center gap-2">
              <img src="/logo.png" className="h-8" alt="BCard Logo" />
              <span className="text-xl font-bold">BussinesCards</span>
            </div>
            <p className="mb-4 text-sm text-gray-300">
              Your digital business card platform. Connect, share, and grow your
              business network with ease.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-300">
              <FaHeart color="#ef4444" />
              <span>Made with passion for business networking</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-300 transition-colors hover:text-white"
                >
                  About Us
                </Link>
              </li>
              {isLoggedIn && (
                <li>
                  <Link
                    to="/favorites"
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    My Favorites
                  </Link>
                </li>
              )}
              {isBusiness && (
                <>
                  <li>
                    <Link
                      to="/create-card"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      Create Card
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/my-cards"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      My Cards
                    </Link>
                  </li>
                </>
              )}
              {isAdmin && (
                <li>
                  <Link
                    to="/admin-panel"
                    className="text-gray-300 transition-colors hover:text-white"
                  >
                    Admin Panel
                  </Link>
                </li>
              )}
            </ul>
          </div>

          {/* User Account */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white">Account</h3>
            <ul className="space-y-2 text-sm">
              {!isLoggedIn ? (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/edit-profile"
                      className="text-gray-300 transition-colors hover:text-white"
                    >
                      Edit Profile
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-1">
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-gray-300">
                <FaEnvelope color="#60a5fa" />
                <span>support@businesscards.com</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaPhone color="#60a5fa" />
                <span>+972-50-123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-gray-300">
                <FaMapMarkerAlt color="#60a5fa" />
                <span>Tel Aviv, Israel</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col items-center justify-between space-y-4 text-sm text-gray-300 md:flex-row md:space-y-0">
          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-4">
            <p>&copy; {currentYear} BussinesCards. All rights reserved.</p>
            <div className="flex space-x-4">
              <Link
                to="/privacy"
                className="transition-colors hover:text-white"
              >
                Privacy Policy
              </Link>
              <Link to="/terms" className="transition-colors hover:text-white">
                Terms of Service
              </Link>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs">
              Built with React & TypeScript | Designed for modern businesses
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
