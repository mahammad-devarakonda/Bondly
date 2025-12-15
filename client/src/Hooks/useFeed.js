import { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

const GET_FEED = gql`
    query GetFeed($page: Int!, $limit: Int!) {
        feed(page: $page, limit: $limit) {
            id
            userName
            avatar
            bio
            connectionStatus
            posts {
                id
                content
                imageURL
                likes{
                    id
                    userName
                    avatar
                }
                createdAt
            }

        }
    }
`;

const useFeed = () => {
    const [page, setPage] = useState(1);
    const [feed, setFeed] = useState([]);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { loading, error, data, fetchMore } = useQuery(GET_FEED, {
        variables: { page: 1, limit: 20 },
    });

    useEffect(() => {
        if (data?.feed) {
            setFeed(data.feed);
            if (data.feed.length < 20) {
                setHasMore(false); 
            }
        }
    }, [data]);

    const loadMore = async () => {
        if (!hasMore) return;
        setLoadingMore(true);
        const nextPage = page + 1;
        const { data: moreData } = await fetchMore({
            variables: { page: nextPage, limit: 20 },
        });
        if (moreData?.feed?.length > 0) {
            setFeed((prev) => [...prev, ...moreData.feed]);
            setPage(nextPage);
            if (moreData.feed.length < 20) {
                setHasMore(false);
            }
        } else {
            setHasMore(false); 
        }
        setLoadingMore(false);
    };

    return { loading, error, feed, loadMore, loadingMore, hasMore };
};  


export default useFeed;
