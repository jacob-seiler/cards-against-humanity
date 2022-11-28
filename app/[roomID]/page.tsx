"use client";

import Chat from "./Chat"
import PlayerList from "./PlayerList"
import SocketProvider from "./(sockets)/SocketProvider";
import { FormEvent, useEffect, useState } from "react";

export default function RoomPage() {
    const [text, setText] = useState("")
    const [name, setName] = useState<string | null>(null)

    useEffect(() => {
        setText(localStorage.getItem("name") ?? "")
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setName(text)
        localStorage.setItem("name", text)
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
