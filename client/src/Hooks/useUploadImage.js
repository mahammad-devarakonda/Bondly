// hooks/useAddPost.js
import { gql, useMutation } from "@apollo/client";

const ADD_POST = gql`
  mutation AddPost($file: Upload!, $content: String!) {
    addPost(file: $file, content: $content) {
      success
      message
      fileUrl
      fileDetails {
        id
        content
        imageURL
      }
    }
  }
`;

export const useAddPost = () => {
  const [addPost, { loading, error, data }] = useMutation(ADD_POST);

  const uploadPost = async (file, content) => {
    return await addPost({
      variables: { file, content },
    });
  };

  return { uploadPost, loading, error, data };
};


export default useAddPost