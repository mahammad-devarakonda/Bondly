import React from 'react';
import { useParams } from 'react-router-dom';

const UserProfile: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="flex items-center space-x-8 mb-12">
                <div className="h-32 w-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-1">
                    <div className="h-full w-full rounded-full bg-white flex items-center justify-center overflow-hidden">
                        <div className="h-[95%] w-[95%] rounded-full bg-gray-100 flex items-center justify-center text-4xl">👤</div>
                    </div>
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-2">User {id || 'Profile'}</h1>
                    <div className="flex space-x-6 text-sm text-gray-600">
                        <span><strong>250</strong> posts</span>
                        <span><strong>1.2k</strong> followers</span>
                        <span><strong>500</strong> following</span>
                    </div>
                    <p className="mt-4 text-gray-700">Digital creator & adventurer. 🌍✨</p>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-1 border-t border-gray-200 pt-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="aspect-square bg-gray-50 flex items-center justify-center text-gray-400 hover:bg-gray-100 cursor-pointer">
                        Post {i}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;
