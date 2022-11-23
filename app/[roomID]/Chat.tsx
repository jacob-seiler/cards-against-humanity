"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
let socket: Socket;

export default function Chat() {
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([] as string[])

    useEffect(() => {
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('message-received', msg => {
            setMessages(prevMessages => [...prevMessages, msg])
        })
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        console.log("Running handle submit")
        socket.emit('message', message)
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
