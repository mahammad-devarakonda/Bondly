import React from 'react';

const MyRequestList: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6 italic text-indigo-600">Pending Requests</h1>
            <div className="space-y-4">
                {[1, 2, 3].map((req) => (
                    <div key={req} className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div>
                                <div className="font-semibold text-sm">Request from User {req}</div>
                                <div className="text-xs text-gray-500">2 hours ago</div>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="px-4 py-1.5 bg-indigo-600 text-white rounded-full text-xs font-semibold hover:bg-indigo-700 transition">Accept</button>
                            <button className="px-4 py-1.5 bg-gray-100 text-gray-600 rounded-full text-xs font-semibold hover:bg-gray-200 transition">Decline</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyRequestList;
