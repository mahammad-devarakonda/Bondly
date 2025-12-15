import React from "react";
import { Link } from "react-router-dom";

const ProfileHeader = ({ user, postsCount, connectionCount, loggedInUser, userID, onShowConnections }) => {
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8">
      <div className="relative mb-5 md:mb-0">
        <img
          className="rounded-full h-32 w-32 md:h-40 md:w-40 object-cover border border-gray-300 shadow-md"
          src={user?.avatar}
          alt={`${user?.userName} avatar`}
        />
      </div>
      <div className="flex flex-col space-y-4 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center md:space-x-6">
          <h1 className="text-black text-xl md:text-2xl font-semibold">{user?.userName}</h1>
          {loggedInUser.id !== userID && (
            <Link
              to={`/inbox/${userID}`}
              state={{ user }}
              className="border border-gray-400 px-4 py-2 rounded-md font-semibold text-sm md:text-base transition hover:bg-gray-200"
            >
              Message
            </Link>
          )}
        </div>
        <div className="flex justify-center md:justify-start space-x-6 text-gray-700 text-sm md:text-lg">
          <p><span className="font-semibold">{postsCount}</span> Posts</p>
          <button onClick={onShowConnections} className="cursor-pointer">
            <span className="font-semibold">{connectionCount}</span> Connections
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
