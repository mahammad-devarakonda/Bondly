import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useUserProfile from "../Hooks/useUserProfile";
import useMyConnections from "../Hooks/useMyConnections";
import Modal from "./Modal";
import { useSelector } from "react-redux"
import ProfileHeader from "./ProfileHeader";
import PostsGrid from "./PostsGrid";
import EditProfile from "./EditProfile";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showConnections, setShowConnections] = useState(false);
  const [editProfile, setEditProfile] = useState(false)
  const authData = useSelector((state) => state.auth)

  const { id: userID } = useParams();
  const { loading, error, userProfile } = useUserProfile(userID);
  const { loading: connectionsLoading, error: connectionsError, connections } = useMyConnections(userID);
  const user = userProfile?.user?.user
  const posts = userProfile?.user?.posts || []
  const loggedInUser = authData?.user
  if (loading) return <p className="text-center text-lg text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-lg text-red-500">Error: {error?.message}</p>;

  const handleOpenImage = (imageURL, content) => {
    setSelectedImage({ imageURL, content });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setModalOpen(false);
  };

  const handleCloseConnections = () => {
    setShowConnections(false);
  };

  return (
    <div className="flex w-full h-screen bg-gray-50">
      <main className="flex-1 p-6 overflow-y-auto min-w-0 transition-all duration-300 bg-white rounded-xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-8 mb-6">
            <ProfileHeader
              user={user}
              postsCount={posts.length}
              connectionCount={userProfile?.user?.connection}
              loggedInUser={loggedInUser}
              userID={userID}
              onShowConnections={() => setShowConnections(true)}
            />
            <button
              onClick={() => setEditProfile(true)}
            >
              Edit Profile
            </button>
          </div>

          <div className="mt-7 text-center md:text-left">
            <p className="text-gray-700 text-sm md:text-base mt-1">{user?.bio}</p>
          </div>

          <hr className="border-t border-gray-300 my-6 w-full" />

          <PostsGrid posts={posts} onImageClick={handleOpenImage} />
        </div>

        <Modal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          modalClassName="w-[600px] max-w-full h-auto rounded-lg p-6 bg-white shadow-lg transition-all duration-300 ease-in-out transform"
        >
          {selectedImage && (
            <div className="flex flex-col items-center justify-center">
              <img
                src={selectedImage.imageURL}
                alt="Selected Post"
                className="w-full max-h-[450px] object-contain rounded-lg border border-gray-200 shadow-md"
              />
              <p className="text-gray-800 mt-4 text-lg font-medium px-4">{selectedImage.content}</p>
            </div>
          )}
        </Modal>


        <Modal
          isOpen={showConnections}
          onClose={handleCloseConnections}
          modalClassName="w-[300px] h-auto rounded-xl p-6 bg-white shadow-lg"
        >
          <h2 className="text-lg font-semibold mb-4">Connections</h2>
          {connectionsLoading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : connectionsError ? (
            <div className="text-center text-red-500">{connectionsError.message}</div>
          ) : connections?.length ? (
            <ul className="space-y-2">
              {connections.map((connection) => (
                <Link className="space-y-4" to={`/userprofile/${connection.id}`}>
                  <li key={connection.id} className="flex items-center space-x-3">
                    <img
                      src={connection.avatar}
                      alt={connection.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <p className="text-gray-700 font-medium">{connection.userName}</p>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-center">No connections available</p>
          )}
        </Modal>

        <Modal
          isOpen={editProfile}
          onClose={() => setEditProfile(false)}
          modalClassName="w-[300px] h-auto rounded-lg p-6 bg-white shadow-lg"
        >
          <EditProfile user={user} />
        </Modal>
      </main>
    </div>

  );
};

export default UserProfile;
