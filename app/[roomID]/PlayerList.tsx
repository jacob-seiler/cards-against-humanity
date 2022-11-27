"use client";

import { useEffect, useState } from "react";
import { EVENTS } from "../../types/socket";
import useSocket from "./(sockets)/useSocket";

interface PlayerListProps {
    name: string;
}

export default function PlayerList({ name }: PlayerListProps) {
    const { socket } = useSocket()
    const [players, setPlayers] = useState<string[]>([])

    useEffect(() => {
        if (!socket)
            return;

        socket.on(EVENTS.SERVER.WELCOME, (names: string[]) => {
            setPlayers([...names])
        });

        socket.on(EVENTS.SERVER.PLAYER_JOIN, (n: string) => {
            setPlayers(prevPlayers => [...prevPlayers, n])
        });

        socket.on(EVENTS.SERVER.PLAYER_LEAVE, (n: string) => {
            setPlayers(prevPlayers => prevPlayers.filter(p => p !== n))
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
                    <li>{ name } (You)</li>
                    {players.map((player, i) => <li key={i}>{player}</li>)}
                </ul>
            }
        </>
    )
}
