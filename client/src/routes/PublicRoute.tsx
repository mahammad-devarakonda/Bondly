import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const PublicRoute: React.FC = () => {
    const { isAuthenticated } = useAuth();

    // if (isLoading) {
    //     return <Loading />;
    // }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default PublicRoute;
