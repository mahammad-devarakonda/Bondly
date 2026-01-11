import { Loader } from '@orbit_ui_toolkit/orbitui-kit';
import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
           <Loader/>
        </div>
    );
};

export default Loading;
