// src/hooks/useEditCard.ts
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { cardSchema } from "../utils/validationSchemas";
import { CreateCardFormData, CardType } from "../types/Card";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/userService";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useEditCard = (id: string | undefined) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { userData, isAdmin } = useSelector((state: RootState) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCardFormData>({
    resolver: joiResolver(cardSchema),
  });

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Authentication required");

        const { data } = await axios.get<CardType>(`${BASE_URL}/cards/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Updated permission check - allow admins to edit any card
        if (userData?._id !== data.user_id && !isAdmin) {
          setError("You don't have permission to edit this card");
          return;
        }

        // Convert card data to form data structure
        reset({
          title: data.title,
          subtitle: data.subtitle,
          description: data.description,
          phone: data.phone,
          email: data.email,
          web: data.web || "",
          imageUrl: data.image.url,
          imageAlt: data.image.alt,
          state: data.address.state || "",
          country: data.address.country,
          city: data.address.city,
          street: data.address.street,
          houseNumber: data.address.houseNumber,
          zip: data.address.zip,
        });
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to load card");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id, reset, userData?._id, isAdmin]);

  const onSubmit = async (data: CreateCardFormData) => {
    if (!id) return false;

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
          url: data.imageUrl || "https://placehold.co/600x300?text=No+Image",
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

      await axios.put(`${BASE_URL}/cards/${id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Card updated successfully!");
      return true;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage =
          error.response?.data?.message || "Failed to update card.";
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
    loading,
    error,
    onSubmit,
  };
};
