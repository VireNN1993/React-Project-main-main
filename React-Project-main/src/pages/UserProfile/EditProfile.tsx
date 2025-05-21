// src/pages/UserProfile/EditProfilePage.tsx
import { useNavigate } from "react-router-dom";
import { Spinner } from "flowbite-react";
import { useEditProfile } from "../../hooks/useEditProfile";
import ProfileForm from "../../components/ProfileForm";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isLoggedIn,
    userData,
  } = useEditProfile(() => navigate("/profile"));

  // אם המשתמש לא מחובר, נעביר אותו לדף ההתחברות
  if (!isLoggedIn) {
    navigate("/signin");
    return null;
  }

  // אם עדיין אין נתוני משתמש, נציג טעינה
  if (!userData) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 max-w-2xl px-4">
      <h1 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">
        Edit Your Profile
      </h1>

      <ProfileForm
        register={register}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        onCancel={() => navigate("/profile")}
      />
    </div>
  );
};

export default EditProfilePage;
