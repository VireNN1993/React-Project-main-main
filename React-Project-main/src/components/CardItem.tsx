// src/components/CardItem.tsx
import { Card } from "flowbite-react";
import { Link } from "react-router-dom";
import { CardType } from "../types/Card";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { toggleLike } from "../redux/slices/cardsSlice";
import { FaHeart, FaRegHeart, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../services/userService";
import { toast } from "react-toastify";

type CardItemProps = {
  card: CardType;
};

const CardItem = ({ card }: CardItemProps) => {
  const dispatch = useDispatch();
  const { isLoggedIn, userData } = useSelector(
    (state: RootState) => state.user,
  );
  const [isLiked, setIsLiked] = useState(
    userData?._id && card.likes.includes(userData._id),
  );

  const isOwner = userData?._id === card.user_id;

  const fullAddress = `${card.address.street} ${card.address.houseNumber}, ${card.address.city}`;
  const truncatedAddress =
    fullAddress.length > 25
      ? `${fullAddress.substring(0, 22)}...`
      : fullAddress;

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn || !userData?._id) {
      toast.info("Please sign in to like cards");
      return;
    }

    try {
      setIsLiked(!isLiked);
      dispatch(toggleLike({ cardId: card._id, userId: userData._id }));

      await axios.patch(
        `${BASE_URL}/cards/${card._id}`,
        {},
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        },
      );

      toast.success(
        isLiked ? "Card removed from favorites" : "Card added to favorites",
      );
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setIsLiked(isLiked);
      dispatch(toggleLike({ cardId: card._id, userId: userData._id }));
      toast.error("Failed to update like status");
    }
  };

  return (
    <Link
      to={`/card/${card._id}`}
      className="hover-lift block" // רק class פשוט שהגדרנו
    >
      <Card className="h-full overflow-hidden">
        {" "}
        {/* שומר על Flowbite default */}
        <div className="relative">
          <img
            src={
              card.image.url ||
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=300&fit=crop&crop=face"
            }
            alt={card.image.alt || card.title}
            className="h-48 w-full object-cover"
          />

          {isLoggedIn && (
            <button
              onClick={handleLikeClick}
              className="absolute top-2 right-2 rounded-full bg-white p-2 shadow transition hover:bg-gray-100"
            >
              {isLiked ? (
                <span className="text-red-500">
                  <FaHeart />
                </span>
              ) : (
                <span className="text-gray-500">
                  <FaRegHeart />
                </span>
              )}
            </button>
          )}

          {isOwner && (
            <div className="absolute bottom-2 left-2 rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
              Your Card
            </div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h5 className="mb-1 line-clamp-1 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {card.title}
            </h5>
            <p className="mb-2 line-clamp-2 font-normal text-gray-700 dark:text-gray-400">
              {card.subtitle}
            </p>
          </div>

          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            <div className="mb-1 flex items-center gap-1">
              <span className="text-blue-600">
                <FaPhone size={12} />
              </span>
              <span className="line-clamp-1">{card.phone}</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-blue-600">
                <FaMapMarkerAlt size={12} />
              </span>
              <span className="line-clamp-1" title={fullAddress}>
                {truncatedAddress}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default CardItem;
