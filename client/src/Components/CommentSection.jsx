import React from 'react'

const CommentSection = ({username}) => {
    return (
        <div className="md:w-1/2 w-full p-6 flex flex-col">
            <p className="text-gray-700 mb-4">
                <span className="font-semibold text-black">{username}</span>
            </p>

            <div className="bg-gray-100 p-4 flex-1">
                <p className="font-semibold mb-2">Comments:</p>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                    <p className="text-gray-600"><span className="font-semibold">fanboy_007:</span> Mass look as always! 🔥🔥</p>
                    <p className="text-gray-600"><span className="font-semibold">cinema_buff:</span> That sweater is a whole vibe! 🎨✨</p>
                    <p className="text-gray-600"><span className="font-semibold">nani_forever:</span> Waiting for your next movie update! 🎬❤️</p>
                    <p className="text-gray-600"><span className="font-semibold">dreamer_girl:</span> Smiling like the king you are! 👑💙</p>
                    <p className="text-gray-600"><span className="font-semibold">meme_lord:</span> When natural star meets natural beauty! 😍📸</p>
                    <p className="text-gray-600"><span className="font-semibold">vibe_check:</span> That background + your swag = Perfection! 😎🙌</p>
                    <p className="text-gray-600"><span className="font-semibold">movie_maniac:</span> Nani in March? Something exciting coming?? 👀🔥</p>
                    <p className="text-gray-600"><span className="font-semibold">lovefromkerala:</span> Malayali fans love you, Nani chetta! 💚💛</p>
                    <p className="text-gray-600"><span className="font-semibold">trend_setter:</span> Instagram's trending post alert 🚀💥</p>
                </div>
            </div>
        </div>
    )
}

export default CommentSection