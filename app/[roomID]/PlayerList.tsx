"use client";

import { useEffect, useState } from "react";
import { EVENTS } from "../../types/socket";
import useSocket from "./(sockets)/useSocket";

export default function PlayerList() {
    const { socket } = useSocket()
    const [players, setPlayers] = useState<string[]>([])

    useEffect(() => {
        if (!socket)
            return

        socket.on(EVENTS.SERVER.PLAYER_JOIN, (player) => {
            setPlayers(prevPlayers => [...prevPlayers, player])
        })

        socket.on(EVENTS.SERVER.PLAYER_LEAVE, (player) => {
            setPlayers(prevPlayers => prevPlayers.filter(p => p !== player))
        })

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