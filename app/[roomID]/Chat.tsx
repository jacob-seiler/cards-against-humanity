"use client";

import { FormEvent, useEffect, useState } from 'react'
import useSocket from './(sockets)/useSocket';

export default function Chat() {
    const { socket } = useSocket()
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        if (!socket)
            return;

        socket.on('message-received', msg => {
            setMessages(prevMessages => [...prevMessages, msg])
        });

        return () => {
            socket.off('message-received')
        }
    }, [socket])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Running handle submit")
        if (socket) socket.emit('message', message)
        setMessages(prevMessages => [...prevMessages, message])
        setMessage("")
    }

    return (
        <>
            <h2>Chat</h2>
            {messages &&
                <ul>
                    {messages.map((message, i) => <li key={i}>{message}</li>)}
                </ul>
            }
            <form onSubmit={handleSubmit}>
                <input
                    className='border border-black'
                    placeholder="Type something"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button
                    className='border border-black'
                    type='submit'
                >
                    Send
                </button>
            </form>
        </>
    )
}
