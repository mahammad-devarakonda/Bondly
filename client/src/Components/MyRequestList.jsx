import { useState, useEffect } from "react";
import { useMutation, gql } from "@apollo/client";
import useReviewRequest from "../Hooks/useReviewRequest";
import { Link } from "react-router-dom";

const REVIEW_REQUEST_MUTATION = gql`
  mutation REVIEWREQUEST($requestedUser: ID!, $status: String!) {
    reviewRequestConnection(input: { requestedUser: $requestedUser, status: $status }) {
      success
      message
      request {
        toUser {
          id
          userName
        }
        status
      }
    }
  }
`;

const MyRequestList = () => {
  const { data, loading, error } = useReviewRequest();
  const [requests, setRequests] = useState([]);

  const [loadingUsers, setLoadingUsers] = useState(new Set());

  useEffect(() => {
    if (data?.myRequests) {
      setRequests(data.myRequests);
    } else {
      console.warn("myRequests is undefined or empty:", data);
    }
  }, [data]);


  const [reviewRequest] = useMutation(REVIEW_REQUEST_MUTATION, {
    onError: (error) => {
      toast.error(error.message || "Something went wrong!");
    },
  });

  const handleAccept = async (userID) => {
    setLoadingUsers((prev) => new Set(prev).add(userID));

    try {
      const { data } = await reviewRequest({
        variables: { requestedUser: userID, status: "accepted" },
      });

      if (data?.reviewRequestConnection?.success) {
        setRequests((prev) => prev.filter((req) => req.fromUser.id !== userID));
        toast.success("Request accepted successfully!");
      } else {
        throw new Error(data?.reviewRequestConnection?.message || "Failed to accept request");
      }
    } catch (error) {
      console.error("🚨 Mutation Failed:", error);
    } finally {
      setLoadingUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(userID);
        return newSet;
      });
    }
  };

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">Error: {error.message}</p>;

  return (
    <div className="h-full p-5">
      <h2 className="text-lg font-semibold mb-4 px-7">Connection Requests</h2>
      <ul className="space-y-3">
        {requests.length > 0 ? (
          requests.map(({ fromUser }) =>
            fromUser ? (
              <li key={fromUser.id} className="flex items-center justify-between bg-gray-100 p-3 rounded-md">
                <div className="flex items-center gap-3">
                  <img className="w-10 h-10 rounded-full" src={fromUser.avatar} alt={fromUser.userName} />
                  <Link to={`/userprofile/${fromUser.id}`} className="text-base font-medium cursor-pointer">{fromUser.userName}</Link>
                </div>
                <button
                  onClick={() => handleAccept(fromUser.id)}
                  disabled={loadingUsers.has(fromUser.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm cursor-pointer transition duration-300 ease-in-out focus:outline-none ${loadingUsers.has(fromUser.id)
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md"
                    }`}
                >
                  {loadingUsers.has(fromUser.id) ? "Processing..." : "Accept"}
                </button>

              </li>
            ) : null
          )
        ) : (
          <p className="text-gray-500 text-center p-4">No requests available</p>
        )}

      </ul>
    </div>
  );
};

export default MyRequestList;
