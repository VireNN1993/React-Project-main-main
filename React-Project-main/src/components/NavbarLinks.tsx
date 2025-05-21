// src/components/NavbarLinks.tsx
import { Link } from "react-router-dom";

type NavLinkProps = {
  to: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink: React.FC<NavLinkProps> = ({ to, children, className }) => (
  <Link
    to={to}
    className={`text-gray-700 hover:text-blue-600 dark:text-gray-300 ${className || ""}`}
  >
    {children}
  </Link>
);

type NavbarLinksProps = {
  isLoggedIn: boolean;
  isBusiness: boolean;
  isAdmin: boolean;
};

const NavbarLinks: React.FC<NavbarLinksProps> = ({
  isLoggedIn,
  isBusiness,
  isAdmin,
}) => {
  return (
    <>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/about">About</NavLink>

      {isLoggedIn && <NavLink to="/favorites">Favorites</NavLink>}

      {/* Only business users can create cards */}
      {isBusiness && <NavLink to="/create-card">Create Card</NavLink>}

      {/* Business users see their cards, admins see all cards */}
      {(isBusiness || isAdmin) && <NavLink to="/my-cards">My Cards</NavLink>}

      {isAdmin && <NavLink to="/admin-panel">Admin</NavLink>}

      {isLoggedIn && (
        <NavLink to="/profile" className="md:hidden">
          Profile
        </NavLink>
      )}
    </>
  );
};

export default NavbarLinks;
