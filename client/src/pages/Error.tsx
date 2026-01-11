import React from 'react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
    const error = useRouteError() as any;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-center p-6 bg-gray-50">
            <div className="text-[120px] font-black text-indigo-100 absolute select-none">404</div>
            <div className="relative z-10 flex flex-col items-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-2 italic">Oops! Something went wrong</h1>
                <p className="text-gray-500 mb-8 italic">
                    {error?.statusText || error?.message || "The page you're looking for doesn't exist."}
                </p>
                <Link
                    to="/"
                    className="px-8 py-3 bg-indigo-600 text-white rounded-full font-bold hover:bg-indigo-700 shadow-xl shadow-indigo-100 transition-all transform hover:scale-105"
                >
                    Back to Safety
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;
