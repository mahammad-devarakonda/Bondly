import { useQuery, gql } from "@apollo/client";

const GET_AUTH = gql`
    query getAuth{
        Me {
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
`


const useAuth =()=>{
    const data=useQuery(GET_AUTH);
    return data
}

export default useAuth