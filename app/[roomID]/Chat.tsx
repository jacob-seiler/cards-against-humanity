"use client";

import { FormEvent, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';

export default function Chat() {
    const [socket, setSocket] = useState<Socket | null>(null)
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState<string[]>([])

    useEffect(() => {
        const initSocket = async () => {
            await fetch('/api/socket');
            setSocket(io())
        }

        initSocket()

        // TODO do this?
        // return () => {
        //     console.log("[unmounted]");
        //     if (socket && socket.connected)
        //         socket.disconnect();
        // };
    }, [])

    useEffect(() => {
        if (!socket)
            return;
        
        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('message-received', msg => {
            setMessages(prevMessages => [...prevMessages, msg])
        })

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
