"use client";

import { createContext } from "react";
import { Socket } from "socket.io-client";

interface SocketProps {
    readonly socket: Socket | null;
}

const SocketContext = createContext<SocketProps>({ socket: null });

export default SocketContext