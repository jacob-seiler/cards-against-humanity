"use client";

import { useEffect, useState } from "react";
import { EVENTS } from "../../types/socket";
import useSocket from "./(sockets)/useSocket";

interface PlayerListProps {
    name: string;
}

type Players = {[id: string]: string}

export default function PlayerList({ name }: PlayerListProps) {
    const { socket } = useSocket()
    const [players, setPlayers] = useState<Players>({})
    const [text, setText] = useState(name)

    useEffect(() => {
        if (!socket)
            return;

        socket.on(EVENTS.SERVER.WELCOME, (names: Players) => {
            setPlayers(names)
        });

        socket.on(EVENTS.SERVER.PLAYER_JOIN, (id: string, n: string) => {
            setPlayers(prevPlayers => {
                return {...prevPlayers, [id]: n}
            })
        });

        socket.on(EVENTS.SERVER.PLAYER_LEAVE, (id: string) => {
            setPlayers(prevPlayers => {
                const copy = {...prevPlayers}
                delete copy[id]
                return copy
            })
        });

        socket.on(EVENTS.SERVER.PLAYER_RENAMED, (id: string, n: string) => {
            setPlayers(prevPlayers => {
                return {...prevPlayers, [id]: n}
            })
        })

        return () => {
            socket.off(EVENTS.SERVER.PLAYER_JOIN)
            socket.off(EVENTS.SERVER.PLAYER_LEAVE)
        }
    }, [socket])

    useEffect(() => {
        if (!socket)
            return

        socket.emit(EVENTS.CLIENT.UPDATE_NAME, text)
    }, [text, socket])

    return (
        <>
            <h2>Players</h2>
            {players &&
                <ul>
                    <li>
                        <input
                            type="text"
                            className="border border-black"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        (You)
                    </li>
                    {Object.entries(players).map(([id, n], i) => {
                        return <li key={i}>{n} ({id})</li>
                    })}
                </ul>
            }
        </>
    )
}
