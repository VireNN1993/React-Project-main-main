// src/pages/AdminPanel/AdminPanelPage.tsx
import { Spinner, Button } from "flowbite-react";
import { useAdminPanel } from "../../hooks/useAdminPanel";
import UserTable from "../../components/UserTable";

const AdminPanelPage = () => {
  const {
    loading,
    error,
    users,
    userData,
    handleToggleBusiness,
    handleDeleteUser,
  } = useAdminPanel();

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 p-4 text-center">
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">
          <p className="font-medium">Error</p>
          <p>{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold text-gray-800 dark:text-white">
        User Management
      </h1>

      <UserTable
        users={users}
        currentUserId={userData?._id}
        onToggleBusiness={handleToggleBusiness}
        onDeleteUser={handleDeleteUser}
      />
    </div>
  );
};

export default AdminPanelPage;
