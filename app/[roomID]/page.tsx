"use client";

import Chat from "./Chat"
import PlayerList from "./PlayerList"
import SocketProvider from "./(sockets)/SocketProvider";

export default function RoomPage() {
    return (
        <SocketProvider>
            <div className="gird grid-cols-3 flex gap-4">
                <div>
                    <PlayerList />
                </div>
                <div className="mx-auto">
                    <h2>Rules / Game</h2>
                </div>
                <div className="ml-auto">
                    <Chat />
                </div>
            </div>
        </SocketProvider>
    )
}
