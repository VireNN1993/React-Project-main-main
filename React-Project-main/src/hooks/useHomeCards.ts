// src/hooks/useHomeCards.ts
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { setAllCards } from "../redux/slices/cardsSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../services/userService";
import { CardType } from "../types/Card";

export const useHomeCards = (cardsPerPage: number) => {
  const dispatch = useDispatch();
  const { allCards, filteredCards, searchTerm } = useSelector(
    (state: RootState) => state.cards,
  );
  const { isLoggedIn, isBusiness, isAdmin } = useSelector(
    (state: RootState) => state.user,
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Load cards from server
  useEffect(() => {
    const fetchCards = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get<CardType[]>(`${BASE_URL}/cards`);
        dispatch(setAllCards(data));
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          setError(error.response?.data?.message || "Failed to load cards");
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        toast.error("Could not load cards. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (allCards.length === 0) {
      fetchCards();
    } else {
      setLoading(false);
    }
  }, [dispatch, allCards.length]);

  // Reset current page when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Calculate pagination
  const totalCards = filteredCards.length;
  const totalPages = Math.ceil(totalCards / cardsPerPage);
  const startIndex = (currentPage - 1) * cardsPerPage;
  const displayedCards = filteredCards.slice(
    startIndex,
    startIndex + cardsPerPage,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers for display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      // Show all numbers if few pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // More complex calculation for many pages
      let startPage = Math.max(1, currentPage - 2);
      const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

      if (endPage - startPage + 1 < maxPagesToShow) {
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }

      // Add first page
      if (startPage > 1) {
        pageNumbers.push(1);
        if (startPage > 2) {
          pageNumbers.push("...");
        }
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add last page
      if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
          pageNumbers.push("...");
        }
        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers;
  };

  return {
    displayedCards,
    loading,
    error,
    currentPage,
    totalCards,
    totalPages,
    startIndex,
    cardsPerPage,
    handlePageChange,
    getPageNumbers,
    isLoggedIn,
    isBusiness,
    isAdmin,
    searchTerm,
  };
};
