"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";

export default function Home() {
    useEffect(() => {
        fetch('/api/socket').finally(() => {
            const socket = io()

            socket.on('connect', () => {
                console.log('connect')
                socket.emit('hello')
            })

            socket.on('hello', (data: any) => {
                console.log('hello', data)
            })

            socket.on('a user connected', () => {
                console.log('a user connected')
            })

            socket.on('disconnect', () => {
                console.log('disconnect')
            })
        })
    }, [])

    return (
        <h1 className="text-3xl font-bold underline">
            Hello world!
        </h1>
    )
}
