import React from 'react';
import { useAuth } from '../hooks/useAuth';

const HomePage: React.FC = () => {
    const { user, logout } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold">Welcome, {user?.username || 'User'}!</h1>
            <p className="mt-2 text-gray-600">This is a protected dashboard.</p>
            <button
                onClick={logout}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
                Logout
            </button>
        </div>
    );
};

export default HomePage;
