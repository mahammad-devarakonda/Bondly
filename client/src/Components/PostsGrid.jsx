const PostsGrid = ({ posts, onImageClick }) => {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 py-6">
            {posts.length ? (
                posts.map((post) => (
                    <img
                        key={post?.id}
                        src={post?.imageURL}
                        alt="User Post"
                        className="w-full h-40 sm:h-56 object-contain rounded-md cursor-pointer transition-transform"
                        onClick={() => onImageClick(post?.imageURL, post?.content)}
                    />
                ))
            ) : (
                <p className="text-gray-500 col-span-3 text-center">No posts available</p>
            )}
        </div>
    );
};

export default PostsGrid;
