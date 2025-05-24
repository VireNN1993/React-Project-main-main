// src/hooks/useCardDetails.ts
import { useState, useEffect } from "react";
import axios from "axios";
import { CardType } from "../types/Card";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useDispatch } from "react-redux";
import { toggleLike } from "../redux/slices/cardsSlice";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/userService";

export const useCardDetails = (id: string | undefined) => {
  const [card, setCard] = useState<CardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { isLoggedIn, userData, isAdmin } = useSelector(
    (state: RootState) => state.user,
  );
  const dispatch = useDispatch();

  const isOwner = userData?._id && card?.user_id === userData._id;
  const isLiked = userData?._id && card?.likes.includes(userData._id);
  // Check if user can edit/delete - either owner or admin
  const canEditDelete = isOwner || isAdmin;

  useEffect(() => {
    const fetchCard = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const { data } = await axios.get<CardType>(`${BASE_URL}/cards/${id}`);
        setCard(data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Failed to load card details",
          );
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
  }, [id]);

  const handleLike = async () => {
    if (!isLoggedIn || !userData?._id || !card) {
      toast.info("Please sign in to like cards");
      return;
    }

    try {
      // Immediate UI response
      dispatch(toggleLike({ cardId: card._id, userId: userData._id }));

      // Server update
      await axios.patch(
        `${BASE_URL}/cards/${card._id}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        },
      );

      // Update local component state
      setCard((prevCard) => {
        if (!prevCard) return null;

        const likes = [...prevCard.likes];
        const index = likes.indexOf(userData._id);

        if (index === -1) {
          likes.push(userData._id);
        } else {
          likes.splice(index, 1);
        }

        return { ...prevCard, likes };
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to update like status");
    }
  };

  const handleDelete = async () => {
    if (!canEditDelete || !card) return false;

    if (!window.confirm("Are you sure you want to delete this card?")) {
      return false;
    }

    try {
      await axios.delete(`${BASE_URL}/cards/${card._id}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });

      toast.success("Card deleted successfully");
      return true; // Return success flag
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to delete card");
      return false;
    }
  };

  return {
    card,
    loading,
    error,
    isOwner,
    isLiked,
    canEditDelete,
    handleLike,
    handleDelete,
  };
};
