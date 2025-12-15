import { useQuery, gql } from "@apollo/client";

const GET_MY_CONNECTIONS = gql`
  query MyConnections($id: ID!) {
    MyConnections(id: $id){
      id
      userName
      email
      avatar
      bio
    }
  }
`;

const useMyConnections = (id) => {
  const { loading, error, data } = useQuery(GET_MY_CONNECTIONS, {
    variables: { id },
    skip: !id, 
  });

  return { loading, error, connections: data?.MyConnections };
};

export default useMyConnections;
