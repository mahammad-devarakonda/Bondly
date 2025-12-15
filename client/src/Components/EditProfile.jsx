import React, {useRef} from 'react'
import { Pencil } from "lucide-react";

const EditProfile = ({ user }) => {
    const fileInputRef = useRef(null);

    const handleEdit=(e)=>{
        const file=e.target.files[0]
        if (file) {
            console.log("Selected file:", file);
          }
    }

    const handleimageUpload = () => {
        fileInputRef.current.click();
    };


    return (
        <div className='grid place-items-center relative'>
            <img className='rounded-full h-28 w-28' src={user?.avatar} alt={`${user?.userName} avatar`} />
            <button 
            className='absolute bottom-4 right-4 p-2  bg-gray-600 rounded-full text-white'
            onClick={handleimageUpload}
            >
                <Pencil className='w-5 h-5' />
            </button>
            <h4>{user?.userName}</h4>
            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleEdit}
            />
        </div>
    )
}

export default EditProfile