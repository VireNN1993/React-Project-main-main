// src/components/navbar/ProfileMenu.tsx
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { UserType } from ".././types/User";

type ProfileMenuProps = {
  userData: UserType | null;
  onLogout: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({ userData, onLogout }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Small profile picture (optional) */}
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
        onClick={onLogout}
        className="text-sm text-red-600 hover:underline"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileMenu;
