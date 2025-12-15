import React, { useState ,useEffect } from "react";
import useAddPost from "../Hooks/useUploadImage";

const AddPost = () => {
    const [file, setFile] = useState(null);
    const [content, setContent] = useState("");
    const { uploadPost, loading, error, data } = useAddPost();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
            await uploadPost(file, content);
        } catch (err) {
            console.error("Upload failed", err);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white shadow-md space-y-4 mt-10"
        >
            <h2 className="text-2xl font-semibold text-gray-700 text-center">
                Create a New Post
            </h2>

            <div>
                <label className="block text-gray-600 font-medium mb-1">Upload Image</label>
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    required
                    className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-medium
                     file:text-white
                    file:bg-gradient-to-r file:from-red-500 file:to-pink-500
                     hover:file:from-red-600 hover:file:to-pink-600
                        file:transition file:duration-300"
                />

                {file && (
                    <img
                        src={URL.createObjectURL(file)}
                        alt="Preview"
                        className="w-full h-30 object-contain rounded-lg mt-2"
                    />
                )}

            </div>

            <div>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Write something about the post..."
                    required
                    rows={5}
                    className="w-full p-4 text-base text-gray-800 placeholder-gray-400 
    border border-gray-300 rounded-xl resize-none 
    shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 
    focus:border-transparent transition duration-300"
                />

            </div>

            <button
                type="submit"
                className="px-4 py-2 rounded-full font-medium text-sm transition duration-300 ease-in-out focus:outline-none bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-md"
            >
                {loading ? "Uploading..." : "Upload Post"}
            </button>

            {error && (
                <p className="text-red-600 text-sm text-center">Error: {error.message}</p>
            )}
            {data && (
                <p className="text-pink-500 text-sm text-center">
                    {data.addPost.message}
                </p>
            )}
        </form>

    );
};

export default AddPost;
