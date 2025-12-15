import { gql, useQuery } from "@apollo/client";
import { use } from "react";

const GET_CHAT = gql`
  query GetChat($id: ID!) {
    chat(id: $id) {
      id
      participants
      message {
        sender {
          id
          userName
        }
        text
        sentAt
      }
      timestamp
    }
  }
`;

const useChat = (chatId) => {
    const { data, loading, error } = useQuery(GET_CHAT, {
        variables: { id: chatId },
    });
    return { data, loading, error };
};

export default useChat

