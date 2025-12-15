import { createBrowserRouter } from "react-router-dom";
import Login from "../Components/Login";
import Register from "../Components/Register";
import Feed from "../Components/Feed";
import UserProfile from "../Components/UserProfile";
import MyRequestList from "../Components/MyRequestList";
import ErrorPage from "../Components/Error";
import Inbox from "../Components/Inbox";
import ProtectedRoute from "../Components/ProtectedRoute";
import TwoFactorAuth from "../Components/TwoFactorAuth";
import Developer from "../Components/Developer";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/register",
        element: <Register />,
        errorElement: <ErrorPage />,
    },
    {
        path:'/2factorAuth',
        element:<TwoFactorAuth/>,
        errorElement:<ErrorPage/>
    },
    {
        path:'/developer',
        element:<Developer/>,
        errorElement:<ErrorPage/>
    },
    {
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/feed",
                element: <Feed />,
            },
            {
                path: "/userprofile/:id",
                element: <UserProfile />,
            },
            {
                path: "/inbox",
                element: <Inbox />,
            },
            {
                path: "/inbox/:chatId",
                element: <Inbox />,
            },
            {
                path: "/requests",
                element: <MyRequestList />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);

export default router;
