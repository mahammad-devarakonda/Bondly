import React from 'react'
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Home,PlusCircle,MessageCircle,Code,Heart } from 'lucide-react';
const MiniNavBar = ({avatar,id,setModalOpen,setRequestListOpen}) => {
    const location = useLocation();
    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-md z-50 flex justify-around items-center py-2">
            <Link
                to="/feed"
                className={`flex flex-col items-center ${location.pathname === "/feed" && "text-blue-600"
                    }`}
            >
                <Home size={22} />
                <span className="text-[10px]">Home</span>
            </Link>
            <button onClick={() => setModalOpen(true)} className="flex flex-col items-center">
                <PlusCircle size={22} />
                <span className="text-[10px]">Create</span>
            </button>
            <Link
                to="/inbox"
                className={`flex flex-col items-center ${location.pathname === "/inbox" && "text-blue-600"
                    }`}
            >
                <MessageCircle size={22} />
                <span className="text-[10px]">Inbox</span>
            </Link>
            <Link
                to="/developer"
                className={`flex flex-col items-center ${location.pathname === "/explore" && "text-blue-600"
                    }`}
            >
                <Code size={22} />
                <span className="text-[10px]">Developer</span>
            </Link>
            <li className="flex flex-col items-center cursor-pointer">
                <Heart
                    className="w-6 h-6 flex-shrink-0"
                    onClick={() => setRequestListOpen(true)}
                />
                <span className="text-[10px]">Notifications</span>
            </li>
            <Link to={`/userprofile/${id}`} className="flex flex-col items-center">
                <img
                    src={avatar}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full flex-shrink-0 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <span className="text-[10px]">Me</span>
            </Link>
        </div>
    )
}

export default MiniNavBar