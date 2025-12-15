import io from "socket.io-client";

export const createSocketConnection = () => {

    if(location.hostname==="localhost"){
        return io("http://localhost:3001", {
            transports: ["websocket"],
            withCredentials: true,
        });
    }else{
        return io('/',{path:"/api/socket.io"})
    }
    
};
