// src/pages/CardDetails/CardDetailsPage.tsx
import { useNavigate, useParams } from "react-router-dom";
import { Button, Spinner } from "flowbite-react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  FaHeart,
  FaRegHeart,
  FaPencilAlt,
  FaTrash,
  FaPhone,
  FaEnvelope,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useCardDetails } from "../../hooks/useCardDetails";
import ContactItem from "../../components/ContactItem";

const CardDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: RootState) => state.user);

  const {
    card,
    loading,
    error,
    isLiked,
    canEditDelete,
    handleLike,
    handleDelete,
  } = useCardDetails(id);

  const onDeleteCard = async () => {
    const success = await handleDelete();
    if (success) {
      navigate("/my-cards");
    }
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700">
          <span className="font-medium">Error:</span> {error}
        </div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  if (!card) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <div className="mb-4 rounded-lg bg-yellow-100 p-4 text-sm text-yellow-700">
          <span className="font-medium">Card not found!</span>
        </div>
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    );
  }

  const fullAddress = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}, ${card.address.country}`;

  return (
    <div className="container mx-auto my-10 max-w-4xl px-4">
      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-800">
        {/* Header with buttons */}
        <div className="relative">
          <img
            src={card.image.url || "https://placehold.co/600x300?text=No+Image"}
            alt={card.image.alt || card.title}
            className="h-64 w-full object-cover"
          />

          <div className="absolute top-4 right-4 flex gap-2">
            {isLoggedIn && (
              <button
                onClick={handleLike}
                className="rounded-full bg-white p-2 text-lg shadow transition hover:bg-gray-100"
              >
                {isLiked ? (
                  <span className="text-red-500">
                    <FaHeart />
                  </span>
                ) : (
                  <span className="text-gray-600">
                    <FaRegHeart />
                  </span>
                )}
              </button>
            )}

            {canEditDelete && (
              <>
                <button
                  onClick={() => navigate(`/edit-card/${card._id}`)}
                  className="rounded-full bg-white p-2 text-lg shadow transition hover:bg-gray-100"
                >
                  <span className="text-blue-600">
                    <FaPencilAlt />
                  </span>
                </button>

                <button
                  onClick={onDeleteCard}
                  className="rounded-full bg-white p-2 text-lg shadow transition hover:bg-gray-100"
                >
                  <span className="text-red-600">
                    <FaTrash />
                  </span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Card content */}
        <div className="p-6">
          <h1 className="mb-2 text-3xl font-bold text-gray-800 dark:text-white">
            {card.title}
          </h1>
          <h2 className="mb-6 text-lg text-gray-600 dark:text-gray-300">
            {card.subtitle}
          </h2>

          <p className="mb-6 whitespace-pre-line text-gray-700 dark:text-gray-300">
            {card.description}
          </p>

          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <ContactItem icon={<FaPhone />} href={`tel:${card.phone}`}>
              {card.phone}
            </ContactItem>

            <ContactItem icon={<FaEnvelope />} href={`mailto:${card.email}`}>
              {card.email}
            </ContactItem>

            {card.web && (
              <ContactItem
                icon={<FaGlobe />}
                href={
                  card.web.startsWith("http") ? card.web : `https://${card.web}`
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                {card.web}
              </ContactItem>
            )}

            <ContactItem icon={<FaMapMarkerAlt />}>{fullAddress}</ContactItem>
          </div>

          {/* Map */}
          <div className="mb-6 h-64 rounded-lg bg-gray-200">
            <iframe
              title="Location Map"
              width="100%"
              height="100%"
              frameBorder="0"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(fullAddress)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
              className="rounded-lg"
            ></iframe>
          </div>

          <div className="mt-6 flex justify-between">
            <Button color="light" onClick={() => navigate(-1)}>
              Back
            </Button>

            {isLoggedIn && (
              <Button color={isLiked ? "light" : "blue"} onClick={handleLike}>
                {isLiked ? (
                  <>
                    <span className="mr-2 text-red-500">
                      <FaHeart />
                    </span>
                    Remove from Favorites
                  </>
                ) : (
                  <>
                    <span className="mr-2">
                      <FaRegHeart />
                    </span>
                    Add to Favorites
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetailsPage;
