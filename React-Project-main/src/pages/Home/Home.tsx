// src/pages/Home/HomePage.tsx
import { Spinner, Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { FaPlusCircle } from "react-icons/fa";
import CardItem from "../../components/CardItem";
import Pagination from "../../components/Pagination";
import { useHomeCards } from "../../hooks/useHomeCards";

const CARDS_PER_PAGE = 8;

const HomePage = () => {
  const {
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
    searchTerm,
  } = useHomeCards(CARDS_PER_PAGE);

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
          <p className="font-medium">Error loading cards</p>
          <p>{error}</p>
        </div>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800 dark:text-white">
          Welcome to BussinesCards
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
          Discover business cards from professionals around the world. Create
          your own business card and share your contact information easily.
        </p>

        {/* Create Card Button for Business Users */}
        {isLoggedIn && isBusiness && (
          <div className="mb-8">
            <Link
              to="/create-card"
              className="inline-flex items-center rounded-lg bg-blue-600 px-6 py-3 text-center text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
            >
              <FaPlusCircle />
              <span className="ml-2">Create New Card</span>
            </Link>
          </div>
        )}
      </section>

      {/* Cards Grid */}
      <section className="mb-10">
        {displayedCards.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {searchTerm.trim() !== ""
                ? `No cards found matching "${searchTerm}"`
                : "No cards available yet"}
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 text-gray-600 dark:text-gray-300">
              Showing {startIndex + 1}-
              {Math.min(startIndex + cardsPerPage, totalCards)} of {totalCards}{" "}
              results
              {searchTerm.trim() !== "" && <span> for "{searchTerm}"</span>}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {displayedCards.map((card) => (
                <CardItem key={card._id} card={card} />
              ))}
            </div>
          </>
        )}
      </section>

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        getPageNumbers={getPageNumbers}
        onPageChange={handlePageChange}
      />

      {/* Floating Button for Mobile */}
      {isLoggedIn && isBusiness && (
        <div className="fixed right-8 bottom-8 md:hidden">
          <Link
            to="/create-card"
            className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-2xl text-white shadow-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
          >
            <FaPlusCircle />
          </Link>
        </div>
      )}
    </div>
  );
};

export default HomePage;
