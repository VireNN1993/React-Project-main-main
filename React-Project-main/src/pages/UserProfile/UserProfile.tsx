// src/pages/UserProfile/UserProfile.tsx
import { Button, Card, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../redux/store";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";

const UserProfile = () => {
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );
  const navigate = useNavigate();

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
    <div className="container mx-auto my-10 max-w-4xl px-4">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          Your Profile
        </h1>
        <Button
          color="blue"
          onClick={() => navigate("/edit-profile")}
          className="flex items-center gap-2"
        >
          <FaEdit />
          Edit Profile
        </Button>
      </div>

      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* תמונת פרופיל */}
          <div className="mb-4 flex items-center justify-center md:mb-0 md:w-1/3">
            <div className="overflow-hidden rounded-full">
              <img
                src={
                  userData.image?.url ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
                }
                alt={userData.image?.alt || "User profile"}
                className="h-48 w-48 object-cover"
              />
            </div>
          </div>

          {/* פרטי משתמש */}
          <div className="md:w-2/3">
            <h2 className="mb-4 text-2xl font-semibold">
              {userData.name.first}{" "}
              {userData.name.middle ? userData.name.middle + " " : ""}
              {userData.name.last}
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* אימייל */}
              <div className="flex items-center gap-2">
                <span className="text-blue-600">
                  <FaEnvelope />
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {userData.email}
                </span>
              </div>

              {/* טלפון */}
              <div className="flex items-center gap-2">
                <span className="text-blue-600">
                  <FaPhone />
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {userData.phone}
                </span>
              </div>

              {/* כתובת */}
              <div className="flex items-start gap-2 sm:col-span-2">
                <span className="mt-1 text-blue-600">
                  <FaMapMarkerAlt />
                </span>
                <span className="text-gray-700 dark:text-gray-300">
                  {userData.address && (
                    <>
                      {userData.address.street} {userData.address.houseNumber},
                      <br />
                      {userData.address.city}
                      {userData.address.state
                        ? `, ${userData.address.state}`
                        : ""}
                      ,
                      <br />
                      {userData.address.country}
                      {userData.address.zip ? ` ${userData.address.zip}` : ""}
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* סטטוס חשבון */}
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                <span className="mr-1 inline">
                  <FaUser />
                </span>
                {userData.isAdmin
                  ? "Admin Account"
                  : userData.isBusiness
                    ? "Business Account"
                    : "Regular Account"}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UserProfile;
