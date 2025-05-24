// src/hooks/useCreateCard.ts
import { useState } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { cardSchema } from "../utils/validationSchemas";
import { CreateCardFormData } from "../types/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useCreateCard = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isLoggedIn, isBusiness } = useSelector(
    (state: RootState) => state.user,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCardFormData>({
    resolver: joiResolver(cardSchema),
  });

  const onSubmit = async (data: CreateCardFormData) => {
    // Only business users can create cards
    if (!isLoggedIn || !isBusiness) {
      toast.error("Only business users can create cards.");
      return false;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Authentication required");

      const payload = {
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        phone: data.phone,
        email: data.email,
        web: data.web || "",
        image: {
          url:
            data.imageUrl ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          alt: data.imageAlt || "Business Card Image",
        },
        address: {
          state: data.state || "",
          country: data.country,
          city: data.city,
          street: data.street,
          houseNumber: data.houseNumber,
          zip: data.zip || 0,
        },
      };

      await axios.post(`${BASE_URL}/cards`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear form and show success message
      reset();
      toast.success("Card created successfully!");
      return true;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to create card.";
        toast.error(errorMessage);
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      return false;
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
    isBusiness,
  };
};
