import React from 'react';
import { useParams } from 'react-router-dom';

const Inbox: React.FC = () => {
    const { chatId } = useParams<{ chatId?: string }>();

    return (
        <div className="flex h-[calc(100-h-16)] max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden mt-4">
            {/* Sidebar */}
            <div className="w-1/3 border-r border-gray-100 flex flex-col">
                <div className="p-4 border-b border-gray-100">
                    <h2 className="text-xl font-bold italic text-indigo-600">Messages</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className={`p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-3 ${chatId === i.toString() ? 'bg-indigo-50' : ''}`}>
                            <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                            <div>
                                <div className="font-semibold text-sm">Contact {i}</div>
                                <div className="text-xs text-gray-500">Latest message snippet...</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
                {chatId ? (
                    <>
                        <div className="p-4 border-b border-gray-100 flex items-center space-x-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                            <div className="font-bold text-lg">Contact {chatId}</div>
                        </div>
                        <div className="flex-1 p-6 bg-gray-50 overflow-y-auto">
                            <div className="flex flex-col space-y-4">
                                <div className="self-end bg-indigo-600 text-white p-3 rounded-2xl rounded-tr-none max-w-xs text-sm">
                                    Hey there! How is it going?
                                </div>
                                <div className="self-start bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none max-w-xs text-sm">
                                    Everything is great, working on Bondl!
                                </div>
                            </div>
                        </div>
                        <div className="p-4 border-t border-gray-100">
                            <input
                                type="text"
                                placeholder="Write a message..."
                                className="w-full px-4 py-2 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                            />
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                        <div className="text-4xl mb-4">💬</div>
                        <div>Select a chat to start messaging</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Inbox;
