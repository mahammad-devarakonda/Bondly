import { gql, useMutation } from '@apollo/client';

const LIKE_MUTATION = gql`
  mutation LikeMutation($postID: ID!) {
    LikeMutation(postID: $postID) {
      id
      content
      likes {
        id
        userName
      }
    }
  }
`;


const useLikePost = () => {
  const [likePost, { data, loading, error }] = useMutation(LIKE_MUTATION);

  const handleLike = async (postId) => {
    try {
      const response = await likePost({
        variables: { postID: postId },
      });
      return response.data.LikeMutation; // You can return the liked post data here
    } catch (err) {
      console.error("Error liking post:", err);
      return null;
    }
  };

  return { handleLike, data, loading, error };
};


export default useLikePost