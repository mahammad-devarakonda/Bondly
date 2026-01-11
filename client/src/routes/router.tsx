import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import Feed from "../pages/Feed";
import UserProfile from "../pages/UserProfile";
import MyRequestList from "../pages/MyRequestList";
import ErrorPage from "../pages/Error";
import Inbox from "../pages/Inbox";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import TwoFactorAuth from "../pages/TwoFactorAuth";
import Developer from "../pages/Developer";
import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <Navigate to="/feed" replace />,
            },
            // Public Routes
            {
                element: <PublicRoute />,
                children: [
                    {
                        path: "/login",
                        element: <LoginPage />,
                    },
                    {
                        path: "/register",
                        element: <RegisterPage />,
                    },
                    {
                        path: "/2factorAuth",
                        element: <TwoFactorAuth />,
                    },
                    {
                        path: "/developer",
                        element: <Developer />,
                    },
                ]
            },
            // Protected Routes
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: "/feed",
                        element: <Feed />,
                    },
                    {
                        path: "/home", // Adding home just in case
                        element: <HomePage />,
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
            // Fallback
            {
                path: "*",
                element: <ErrorPage />,
            },
        ]
    }
]);

export default router;
