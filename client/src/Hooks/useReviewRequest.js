import { useQuery ,gql} from "@apollo/client";

const REVIEW_REQUEST = gql`
    query REVIEWREQUEST{
        myRequests {
        id
        fromUser {
            id
            userName
            email
            avatar
        }
        toUser {
            id
            userName
            email
            avatar
        }
        status

    }
    }
`;

const useReviewRequest=()=>{
    const {data,loading,error}=useQuery(REVIEW_REQUEST)
    return {data,loading,error}
}

export default useReviewRequest