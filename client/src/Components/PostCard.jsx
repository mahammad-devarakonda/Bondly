import React from "react";
import { Link } from "react-router-dom";
import { Heart, MessageCircle } from "lucide-react";
import dateago from "../Utills/postRandoms"

const PostCard = ({ user, onFollowClick, isRequested, likedPosts, }) => {
  const randomPost = user?.posts?.length
    ? user.posts[Math.floor(Math.random() * user.posts.length)]
    : null;
  const isDisabled =
    user.connectionStatus === "interested" ||
    user.connectionStatus === "accepted" ||
    isRequested;

  const getButtonLabel = () => {
    if (user.connectionStatus === "accepted") return "Friends";
    if (user.connectionStatus === "interested" || isRequested) return "Requested";
    return "Follow";
  };

  const getButtonStyle = () => {
    if (user.connectionStatus === "accepted")
      return "bg-green-500 text-white cursor-default";
    if (user.connectionStatus === "interested" || isRequested)
      return "bg-gray-300 text-gray-600 cursor-not-allowed";
    return "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-lg hover:scale-105 active:scale-95";
  };

  return (
    <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl overflow-hidden mb-6 border border-gray-200 transition-all duration-300">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-4">
          <Link
            to={`/userprofile/${user.id}`}
            className="hover:opacity-90 transition-opacity"
          >
            <img
              className="rounded-full w-12 h-12 object-cover border border-gray-100"
              src={user.avatar}
              alt={`${user.userName} avatar`}
            />
          </Link>
          <div>
            <p className="text-base font-semibold text-gray-800">
              <Link to={`/userprofile/${user.id}`} className="hover:underline">
                {user.userName}
              </Link>
            </p>
            <p className="text-xs text-gray-500">{dateago(randomPost.createdAt)}</p>
          </div>
        </div>

        <button
          className={`text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 border-none ${getButtonStyle()} ${isDisabled && "opacity-50"}`}
          onClick={() => onFollowClick(user.id)}
          disabled={isDisabled}
        >
          {getButtonLabel()}
        </button>
      </div>

      {randomPost?.imageURL ? (
        <img
          src={randomPost.imageURL}
          alt="User Post"
          className="w-full h-[450px] object-contain"
        />
      ) : (
        <div className="w-full h-[250px] bg-gradient-to-r from-gray-100 to-gray-200 flex items-center justify-center text-gray-500 text-sm italic">
          No post available
        </div>
      )}


      {user?.posts && (
        <>
          <div className="px-4 mt-4 flex gap-6 items-center">
          </div>
          <div className="px-4 py-3 text-gray-700 text-sm leading-relaxed">
            <Link to={`/userprofile/${user.id}`} className="font-semibold text-gray-900 mr-1">{user.userName}</Link>
            {randomPost?.content}
          </div>
        </>
      )}
    </div>
  );
};

export default PostCard;
