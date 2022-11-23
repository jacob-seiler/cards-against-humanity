import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import { Server } from 'socket.io'

export default function SockerHandler(_req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server as any)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('input-change', msg => {
        console.log('input change')
        socket.broadcast.emit('update-input', msg)
      })
    })
  }
  res.end()
}
