"use client";

import Chat from "./Chat"
import PlayerList from "./PlayerList"
import SocketProvider from "./(sockets)/SocketProvider";

export default function RoomPage() {
    return (
        <SocketProvider>
            <div className="gird grid-cols-3">
                <div>
                    <PlayerList />
                </div>
                <div>
                    {/* <h2>Rules / Game</h2> */}
                </div>
                <div>
                    <Chat />
                </div>
            </div>
        </SocketProvider>
    )
}
