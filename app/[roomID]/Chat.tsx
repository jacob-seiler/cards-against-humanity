"use client";

import { ChangeEvent, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client';
let socket: Socket;

export default function Chat() {
    const [input, setInput] = useState('')

    useEffect(() => {
        socketInitializer()
    }, [])

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected')
        })

        socket.on('update-input', msg => {
            setInput(msg)
        })
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value)
        socket.emit('input-change', e.target.value)
    }

    return (
        <input
            placeholder="Type something"
            value={input}
            onChange={onChangeHandler}
        />
    )
}
