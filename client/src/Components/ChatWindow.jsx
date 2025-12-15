import { motion } from "framer-motion";
import { Send, MessageCircle, ArrowLeft } from "lucide-react";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const ChatWindow = ({
    selectedChatUser,
    messages,
    id,
    message,
    setMessage,
    handleSendMessage,
    onBack,
    userStatusMap,
}) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <div className="w-full h-screen bg-white border-l border-gray-200 flex flex-col">
            {selectedChatUser ? (
                <div className="flex flex-col h-full">
                    <div className="w-full flex items-center border-b border-gray-200 p-4 gap-4 bg-white sticky top-0 z-10 shadow-sm">
                        <button onClick={onBack} className="md:hidden text-gray-600 hover:text-black transition cursor-pointer">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <img className="rounded-full w-10 h-10 object-cover" src={selectedChatUser?.avatar} alt={selectedChatUser?.userName} />
                        <div>
                            <Link to={`/userprofile/${id}`} className="text-lg font-semibold text-black">{selectedChatUser?.userName}</Link>
                            <p className={`text-sm ${userStatusMap[selectedChatUser.id] === "online" ? "text-green-500" : "text-gray-400"}`}>
                                {userStatusMap[selectedChatUser.id] === "online" ? "Online" : "Offline"}
                            </p>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-20 bg-gray-50 space-y-4">
                        {messages?.length === 0 ? (
                            <p className="text-gray-500 text-center mt-10">No messages yet. Start the conversation!</p>
                        ) : (
                            messages?.map((msg, index) => (
                                <div key={index} className={`flex ${msg?.sender?.id === id ? "justify-end" : "justify-start"}`}>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                        className={`max-w-[80%] md:max-w-[75%] px-4 py-2 rounded-2xl text-sm break-words whitespace-pre-wrap shadow ${
                                            msg?.sender?.id === id
                                                ? "bg-gradient-to-r from-red-400 to-pink-500 text-white rounded-br-none"
                                                : "bg-gradient-to-r from-pink-500 to-red-400 text-white rounded-bl-none"
                                        }`}
                                    >
                                        {msg?.message || msg.text}
                                    </motion.div>
                                </div>
                            ))
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="border-t border-gray-200 p-3 bg-white sticky bottom-0 z-10">
                        <div className="relative flex items-center">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 p-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition duration-300 text-black shadow-sm"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleSendMessage}
                                className="absolute right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white p-2 rounded-full shadow hover:bg-blue-600 transition"
                            >
                                <Send className= "w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center flex-1 text-center px-4">
                    <MessageCircle className="w-24 h-24 text-gray-400 mb-6" />
                    <h1 className="text-2xl font-semibold text-gray-700">Your Messages</h1>
                    <p className="text-gray-500 mt-2">Select a user from the chat list to start a conversation.</p>
                </div>
            )}
        </div>
    );
};

export default ChatWindow;
