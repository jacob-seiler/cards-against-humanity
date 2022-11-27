"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import SocketContext from "./SocketContext";

export default function SocketProvider({ children }: { children: React.ReactNode }) {
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const initSocket = async () => {
            await fetch('/api/socket')
            setSocket(io())
        }

        initSocket()

        return () => {
            if (socket && socket.connected)
                socket.disconnect();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        if (!socket) return;

        socket.on("disconnect", () => {
            setSocket(null);

            socket.once("reconnect", () => {
                setSocket(socket);
            });
        });
    }, [socket])

    return (
        <>
            <SocketContext.Provider value={{ socket }}>
                { children }
            </SocketContext.Provider>
        </>
    )
}