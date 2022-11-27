"use client";

import { useEffect, useState } from "react";
import { EVENTS } from "../../types/socket";
import useSocket from "./(sockets)/useSocket";

export default function PlayerList() {
    const { socket } = useSocket()
    const [players, setPlayers] = useState<string[]>(['You'])

    useEffect(() => {
        if (!socket)
            return;

        socket.on(EVENTS.SERVER.WELCOME, (names: string[]) => {
            setPlayers(["You", ...names])
        });

        socket.on(EVENTS.SERVER.PLAYER_JOIN, (name: string) => {
            setPlayers(prevPlayers => [...prevPlayers, name])
        });

        socket.on(EVENTS.SERVER.PLAYER_LEAVE, (name: string) => {
            console.log('removing', name)
            setPlayers(prevPlayers => prevPlayers.filter(p => p !== name))
        });

        return () => {
            socket.off(EVENTS.SERVER.PLAYER_JOIN)
            socket.off(EVENTS.SERVER.PLAYER_LEAVE)
        }
    }, [socket])

    return (
        <>
            <h2>Players</h2>
            {players &&
                <ul>
                    {players.map((player, i) => <li key={i}>{player}</li>)}
                </ul>
            }
        </>
    )
}
