import React from 'react';
import { useQuery } from '@apollo/client/react';
import { GET_FEED } from '../graphql/operations';
import { Box, Typography, Post, Loader, SocialLayout } from "@orbit_ui_toolkit/orbitui-kit";

const Feed: React.FC = () => {
    const { data, loading, error } = useQuery(GET_FEED, {
        variables: { page: 1, limit: 10 }
    });

    if (loading) return (
        <Box fullScreen center>
            <Loader variant="multicolor" size="xl" />
        </Box>
    );

    if (error) return (
        <Box fullScreen center className="p-8">
            <Typography variant="body1" color="text-red-500" className="italic">
                Error loading feed: {error.message}
            </Typography>
        </Box>
    );

    const posts = (data as any)?.feed || [];

    return (
        <SocialLayout maxWidth="600px">

            <div className="flex flex-col gap-8">
                {posts.length > 0 ? (
                    posts.map((userFeed: any) => (
                        userFeed.posts.map((post: any) => (
                            <Post
                                key={post.id}
                                username={userFeed.userName}
                                profilePic={userFeed.avatar || `https://ui-avatars.com/api/?name=${userFeed.userName}&background=random`}
                                postImage={post.imageURL || ""}
                                caption={post.content}
                                likesCount={0}
                            />
                        ))
                    ))
                ) : (
                    <Box className="text-center p-12 text-gray-400 bg-white rounded-xl border border-dashed border-gray-200">
                        No posts yet. Follow some users to see their content!
                    </Box>
                )}
            </div>
        </SocialLayout>
    );
};

export default Feed;
