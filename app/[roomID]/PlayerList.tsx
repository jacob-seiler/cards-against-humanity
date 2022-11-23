"use client";

import { useEffect, useState } from "react";
import useSocket from "./(sockets)/useSocket";

export default function PlayerList() {
    const { socket } = useSocket()
    const [players, setPlayers] = useState<string[]>([])

    useEffect(() => {
        if (!socket)
            return

        socket.on('player-join', (player) => {
            setPlayers(prevPlayers => [...prevPlayers, player])
        })

        socket.on('player-leave', (player) => {
            setPlayers(prevPlayers => prevPlayers.filter(p => p !== player))
        })

        return () => {
            socket.off('player-join')
            socket.off('player-leave')
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