"use client";

import { FormEvent, useEffect, useState } from 'react'
import useSocket from './(sockets)/useSocket';
import type { Message } from '../../types/socket';

export default function Chat() {
    const { socket } = useSocket()
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (!socket)
            return;

        socket.on('message-received', (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg])
        });

        return () => {
            socket.off('message-received')
        }
    }, [socket])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (socket) socket.emit('message', text)
        setMessages(prevMessages => [...prevMessages, { timestamp: new Date().getTime(), content: text }])
        setText("")
    }

    const formatDate = (milliseconds: number): string => {
        const date = new Date(milliseconds)
        const [_, time, meridiem] = date.toLocaleString().split(" ")
        return `${time.substring(0, time.length - 3)} ${meridiem}`
    }

    return (
        <>
            <h2>Chat</h2>
            {messages &&
                <ul>
                    {messages.map((message, i) => {
                        return <li key={i}>{`${formatDate(message.timestamp)} - ${message.content}`}</li>
                    })}
                </ul>
            }
            <form onSubmit={handleSubmit}>
                <input
                    className='border border-black'
                    placeholder="Type something"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
