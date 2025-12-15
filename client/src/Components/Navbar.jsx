import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  MessageCircle,
  Heart,
  PlusCircle,
  Code,
  User,
} from "lucide-react";
import { useSelector } from "react-redux";
import Modal from "./Modal";
import MyRequestList from "./MyRequestList";
import AddPost from "./AddPost";
import MiniNavBar from "./MiniNavBar";


const navItems = [
  { to: "/feed", icon: Home, type: "link" },
  { to: "/inbox", icon: MessageCircle, type: "link" },
  { onClick: () => setRequestListOpen(true), icon: Heart, type: "button" },
  { onClick: () => setModalOpen(true), icon: PlusCircle, type: "button" },
  { to: "/developer", icon: Code, type: "link" }
];


const Navbar = () => {
  const location = useLocation();
  const { user: { id, avatar } } = useSelector((state) => state.auth);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRequestListOpen, setRequestListOpen] = useState(false);


  return (
    <>
      <div className="hidden md:flex h-screen bg-white border-r border-gray-200 fixed flex-col justify-between transition-all duration-300 overflow-hidden w-16 ">
        <div className="flex justify-center items-center px-4 py-5">
          <h1 className="text-3xl font-serif font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-yellow-500 text-transparent bg-clip-text tracking-widest drop-shadow-lg animate-infinitePulse">
            ∞
          </h1>
        </div>

        <nav className="flex flex-col flex-grow justify-between items-center px-2 mt-4 relative">
          <ul className="flex flex-col space-y-8 text-base w-full items-center">
            {navItems.map((item, index) => (
              <li key={index} className="w-full flex items-center justify-center group-hover:justify-start transition-all duration-300">
                {item.type === "link" ? (
                  <Link to={item.to} className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50">
                    <item.icon className="w-6 h-6 flex-shrink-0" />
                  </Link>
                ) : (
                  <button onClick={item.onClick} className="...">
                    <item.icon className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 w-full px-3 py-2 rounded-lg hover:bg-red-50 focus:outline-none" />
                  </button>
                )}
              </li>
            ))}
          </ul>

          <div className="py-3 flex items-center justify-center group-hover:justify-start transition-all duration-300">
            <Link
              to={`/userprofile/${id}`}
              className="flex items-center gap-3 text-gray-700 hover:text-red-500 transition-colors duration-200 rounded-lg hover:bg-red-50"
            >
              <div className="relative">
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full flex-shrink-0 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
          </div>

        </nav>
      </div>


      {!location.pathname.startsWith("/inbox") && (
        <MiniNavBar
          id={id}
          avatar={avatar}
          setModalOpen={setModalOpen}
          setRequestListOpen={setRequestListOpen} />
      )}

      <Modal
        isOpen={isRequestListOpen}
        onClose={() => setRequestListOpen(false)}
        title="Friend Requests"
        modalClassName="rounded-2xl"
      >
        <MyRequestList />
      </Modal>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Create Post"
        modalClassName="rounded-2xl"
      >
        <AddPost />
      </Modal>
    </>
  );
};

export default Navbar;
