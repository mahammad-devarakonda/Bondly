import React, { useEffect, useState } from "react";
import useFeed from "../Hooks/useFeed";
import useFollowRequest from "../Hooks/useFollowRequest";
import PostCard from "../Components/PostCard";
import Modal from "../Components/Modal";
import CommentSection from "../Components/CommentSection";
import { useNavigate } from "react-router-dom";
import useLikePost from "../Hooks/useLike"
import { useSelector } from "react-redux";

const UserFeed = () => {
    const { loading, error, feed, loadMore, loadingMore, hasMore } = useFeed();
    const { handleFollowRequest } = useFollowRequest();
    const [requestedIds, setRequestedIds] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null);
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    const { user: { id, email, userName, avatar } } = useSelector((state) => state.auth);
    const currentUserId = id;
    const [likedPosts, setLikedPosts] = useState({});

    const { handleLike, loading: likeLoading, error: likeError } = useLikePost();

    useEffect(() => {
        if (error) {
            navigate('/');
        }
    }, [error, navigate]);

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                !loadingMore &&
                hasMore
            ) {
                loadMore();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMore, loadingMore, hasMore]);

    useEffect(() => {
        const initialLikedState = feed.reduce((acc, post) => {
            acc[post.id] = post.likes && post.likes.some(like => like.id === currentUserId); // Set the liked state based on backend data
            return acc;
        }, {});
        setLikedPosts(initialLikedState);
    }, [feed, currentUserId]); 


    useEffect(() => {
        const hasOpened = localStorage.getItem('hasOpenedUserFeedModal');
        if (!hasOpened) {
            setModalType('welcome');
            setModalOpen(true);
            localStorage.setItem('hasOpenedUserFeedModal', 'true');
        }
    }, []);

    const handleLikeClick = (postId) => {
        setLikedPosts(prev => ({
            ...prev,
            [postId]: !prev[postId],
        })); 
        handleLike(postId);
    };

    const handleOpenImage = (imageURL, user) => {
        setData({ imageURL, user });
        setModalType('image');
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setData(null);
        setModalType(null);
        setModalOpen(false);
    };

    const handleFollowClick = (id) => {
        const user = feed.find((u) => u.id === id);
        if (!user || user.connectionStatus === "interested" || user.connectionStatus === "accepted") {
            return;
        }
        if (!requestedIds.includes(id)) {
            setRequestedIds((prev) => [...prev, id]);
            handleFollowRequest(id);
        }
    };

    if (loading && feed.length === 0) return <p className="text-center">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;

    return (
        <div className="flex flex-col items-center p-4">
            {feed.map((user) => (
                <PostCard
                    key={user.id}
                    user={user}
                    onFollowClick={handleFollowClick}
                    onImageClick={handleOpenImage}
                    isRequested={requestedIds.includes(user.id)}
                    handleLikeClick={handleLikeClick}
                    likedPosts={likedPosts}
                />
            ))}

            <button
                onClick={loadMore}
                disabled={loadingMore || !hasMore}
                className={`mt-4 px-4 py-2 text-black rounded ${(!hasMore || loadingMore) && 'opacity-50 cursor-not-allowed'}`}
            >
                {loadingMore ? 'Loading more...' : hasMore ? 'Load More' : 'No more posts'}
            </button>
            {!hasMore && (
                <p className="mt-4 text-gray-500">🎉 You have reached the end of the feed.</p>
            )}

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                modalClassName="w-[900px] h-[400px] rounded-md"
            >
                {modalType === 'image' && data && (
                    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden w-full max-w-4xl mx-auto">
                        <div className="md:w-1/2 w-full">
                            <img
                                src={data.imageURL}
                                alt="Post"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <CommentSection username={data.user?.userName} />
                    </div>
                )}

                {modalType === 'welcome' && (
                    <div className="flex flex-col items-center justify-center h-full px-4 text-center">
                        <h2 className="text-2xl mb-3 font-semibold italic">👋 Welcome to Bondly!</h2>
                        <p className="text-gray-600 mb-5 max-w-md">
                            One post, endless possibilities. Share your moment—make it meaningful!
                        </p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default UserFeed;
