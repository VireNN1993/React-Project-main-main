// src/pages/MyCards/MyCards.tsx
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { CardType } from "../../types/Card";
import { Spinner, Button } from "flowbite-react";
import axios from "axios";
import { BASE_URL } from "../../services/userService";
import { toast } from "react-toastify";
import CardItem from "../../components/CardItem";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";

const MyCards = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cards, setCards] = useState<CardType[]>([]);
  const { userData, isAdmin, isBusiness } = useSelector(
    (state: RootState) => state.user,
  );

  useEffect(() => {
    const fetchCards = async () => {
      if (!userData?._id) return;

      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Authentication required");
          return;
        }

        // If user is admin, get all cards, otherwise get only user's cards
        const endpoint = isAdmin
          ? `${BASE_URL}/cards`
          : `${BASE_URL}/cards/my-cards`;

        const { data } = await axios.get<CardType[]>(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCards(data);
      } catch (error) {
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

    fetchCards();
  }, [userData?._id, isAdmin]);

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
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
          {isAdmin && !isBusiness ? "All Business Cards" : "My Business Cards"}
        </h1>
        {/* Only show create button for business users */}
        {isBusiness && (
          <Link
            to="/create-card"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <FaPlusCircle />
            <span className="ml-2">Create New Card</span>
          </Link>
        )}
      </div>

      {cards.length === 0 ? (
        <div className="mt-10 rounded-lg bg-gray-50 p-6 text-center dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-medium text-gray-700 dark:text-gray-300">
            {isAdmin && !isBusiness
              ? "No cards found in the system"
              : "You haven't created any cards yet"}
          </h2>
          <p className="mb-6 text-gray-600 dark:text-gray-400">
            {isAdmin && !isBusiness
              ? "There are no business cards in the system to display."
              : "Create your first business card to showcase your business to others."}
          </p>
          {isBusiness && (
            <Link
              to="/create-card"
              className="inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <FaPlusCircle />
              <span className="ml-2">Create Your First Card</span>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cards.map((card) => (
            <CardItem key={card._id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCards;
