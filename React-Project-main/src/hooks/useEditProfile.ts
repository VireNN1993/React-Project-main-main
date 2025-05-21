// src/hooks/useEditProfile.ts
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { userEditSchema } from "../utils/validationSchemas";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { updateUser } from "../redux/slices/userSlice";
import { toast } from "react-toastify";
import { updateUserProfile } from "../services/userService";
import axios from "axios";

// טיפוס לנתוני הטופס
export type UserEditFormData = {
  first: string;
  middle?: string;
  last: string;
  phone: string;
  email: string;
  password?: string;
  imageUrl?: string;
  imageAlt?: string;
  state?: string;
  country: string;
  city: string;
  street: string;
  houseNumber: number;
  zip?: number;
};

export const useEditProfile = (onSuccess: () => void) => {
  const { userData, isLoggedIn } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserEditFormData>({
    resolver: joiResolver(userEditSchema),
    defaultValues: {
      // השדות יהיו ריקים תחילה ויעודכנו כשהנתונים יטענו
      first: "",
      last: "",
      phone: "",
      email: "",
      country: "",
      city: "",
      street: "",
      houseNumber: 0,
    },
  });

  // טעינת נתוני המשתמש הנוכחיים לטופס
  useEffect(() => {
    if (userData) {
      reset({
        first: userData.name.first,
        middle: userData.name.middle || "",
        last: userData.name.last,
        phone: userData.phone,
        email: userData.email,
        imageUrl: userData.image?.url || "",
        imageAlt: userData.image?.alt || "",
        state: userData.address?.state || "",
        country: userData.address?.country || "",
        city: userData.address?.city || "",
        street: userData.address?.street || "",
        houseNumber: userData.address?.houseNumber || 0,
        zip: userData.address?.zip || undefined,
        // שדה הסיסמה נשאר ריק כי לא רוצים להציג את הסיסמה הנוכחית
        password: "",
      });
    }
  }, [userData, reset]);

  // טיפול בשליחת הטופס
  const onSubmit = async (data: UserEditFormData) => {
    if (!userData?._id) {
      toast.error("User information missing");
      return;
    }

    setIsSubmitting(true);

    try {
      // שליחת הנתונים לעדכון לשרת
      const updatedUserData = await updateUserProfile(userData._id, data);

      // עדכון ה-Redux
      dispatch(updateUser(updatedUserData));

      toast.success("Profile updated successfully");
      onSuccess(); // קריאה לפונקציה מותאמת אישית לאחר הצלחה
    } catch (error) {
      console.error("Update failed:", error);

      if (axios.isAxiosError(error) && error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
    isLoggedIn,
    userData,
  };
};
