// src/pages/AdminPanel/components/UserTable.tsx
import { Checkbox } from "flowbite-react";
import { FaTrash, FaUserTie, FaUser } from "react-icons/fa";
import { UserData } from ".././hooks/useAdminPanel";

type UserTableProps = {
  users: UserData[];
  currentUserId?: string;
  onToggleBusiness: (userId: string, isBusiness: boolean) => void;
  onDeleteUser: (userId: string) => void;
};

const UserTable: React.FC<UserTableProps> = ({
  users,
  currentUserId,
  onToggleBusiness,
  onDeleteUser,
}) => {
  if (users.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg text-gray-600 dark:text-gray-300">
          No users found in the system.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-50 text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Phone
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Business
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <td className="px-6 py-4 font-medium whitespace-nowrap text-gray-900 dark:text-white">
                {`${user.name.first} ${user.name.last}`}
              </td>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.phone}</td>
              <td className="px-6 py-4">
                {user.isAdmin ? (
                  <div className="flex items-center gap-1 font-medium text-purple-600">
                    <FaUserTie /> <span>Admin</span>
                  </div>
                ) : user.isBusiness ? (
                  <div className="flex items-center gap-1 text-blue-600">
                    <FaUserTie /> <span>Business</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-gray-600">
                    <FaUser /> <span>Regular</span>
                  </div>
                )}
              </td>
              <td className="px-6 py-4">
                <Checkbox
                  checked={user.isBusiness}
                  onChange={() => onToggleBusiness(user._id, user.isBusiness)}
                  disabled={user.isAdmin || user._id === currentUserId}
                />
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => onDeleteUser(user._id)}
                  disabled={user.isAdmin || user._id === currentUserId}
                  className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-center text-xs font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none disabled:opacity-50"
                >
                  <div className="mr-2">
                    <FaTrash />
                  </div>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
