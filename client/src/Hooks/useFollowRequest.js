import { useMutation, gql } from "@apollo/client";
import { useState } from "react";

const SEND_REQUEST = gql`
  mutation SENDREQUEST($toUser: String!, $status: String!) {
    sendRequestConnection(input: { toUser: $toUser, status: $status }) {
      success
      message
      request {
        toUser {
          userName
        }
        status
        timestamp
      }
    }
  }
`;

const useFollowRequest = () => {
  const [activeId, setActiveId] = useState(null); 
  const [sendRequest, { loading, error }] = useMutation(SEND_REQUEST);

  const handleFollowRequest = async (id) => {
    try {
      setActiveId(id);
      await sendRequest({
        variables: {
          toUser: id,
          status: "interested",
        },
      });
    } catch (err) {
      console.error("Error sending request:", err);
    } finally {
      setActiveId(null);
    }
  };

  return { handleFollowRequest, loading, error, activeId };
};

export default useFollowRequest;
