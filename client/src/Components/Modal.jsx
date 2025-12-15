import React from "react";

const Modal = ({ isOpen, onClose, children, modalClassName = ""}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gradient-to-r bg-opacity-40 backdrop-blur-sm flex items-center justify-center">
            <div className={`bg-white shadow-lg relative ${modalClassName}`}>
                <button
                    className="absolute top-2 right-2 text-gray-950 hover:text-black cursor-pointer"
                    onClick={onClose}
                >
                    ✖
                </button>

                <div className="mt-4">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
