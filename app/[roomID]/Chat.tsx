"use client";

import type { Message } from '../../types/socket';
import { EVENTS } from '../../types/socket';
import { FormEvent, useEffect, useState } from 'react'
import useSocket from './(sockets)/useSocket';

export default function Chat() {
    const { socket } = useSocket()
    const [text, setText] = useState('')
    const [messages, setMessages] = useState<Message[]>([])

    useEffect(() => {
        if (!socket)
            return;

        socket.on(EVENTS.SERVER.MESSAGE, (msg: Message) => {
            setMessages(prevMessages => [...prevMessages, msg])
        });

        return () => {
            socket.off(EVENTS.SERVER.MESSAGE)
        }
    }, [socket])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (socket) socket.emit(EVENTS.CLIENT.MESSAGE, text)
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
