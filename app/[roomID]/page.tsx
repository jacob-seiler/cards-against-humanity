"use client";

import Chat from "./Chat"
import PlayerList from "./PlayerList"
import SocketProvider from "./(sockets)/SocketProvider";
import { FormEvent, useState } from "react";

export default function RoomPage() {
    const [text, setText] = useState("")
    const [name, setName] = useState<string | null>(null)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setName(text)
    }

    if (!name)
        return (
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="border border-black"
                />
                <button type="submit" className="border border-black">Submit</button>
            </form>
        )

    return (
        <SocketProvider>
            <div className="gird grid-cols-3 flex gap-4">
                <div>
                    <PlayerList name={name} />
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
