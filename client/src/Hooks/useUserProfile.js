import { useQuery, gql } from "@apollo/client";

const GET_USER_PROFILE = gql`
  query GetUserProfile($id: ID) {
    user(id: $id) {
      user {
        id
        userName
        email
        avatar
        bio
      }
      posts {
        id
        content
        imageURL
      }
      connection
    }
  }
`;


const useUserProfile = ( id ) => {
  const { loading, error, data } = useQuery(GET_USER_PROFILE, {
    variables: { id },
    skip: !(id),
  });

  return {
    loading,
    error,
    userProfile:data
  };
};

export default useUserProfile;
