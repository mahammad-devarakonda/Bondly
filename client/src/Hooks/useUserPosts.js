import { useQuery, gql } from "@apollo/client";


const USER_PROFILE_POSTS = gql`
  query UserPosts {
    UserPosts {
    user{
        id
        userName
        email
    }
    posts{
        id
        content
        description
        imageURL
    }
  }
  }
`;


const useUserPosts = () => {
    const { data, loading, error } = useQuery(USER_PROFILE_POSTS);

    return {loading,error,data};
}


export default useUserPosts