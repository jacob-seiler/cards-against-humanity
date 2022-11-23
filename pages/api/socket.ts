import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import { Server } from 'socket.io'
import type { Message } from "../../types/socket";

export default function SockerHandler(_req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server as any)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on('message', text => {
        const message: Message = {
          timestamp: new Date().getTime(),
          content: text
        }
        
        socket.broadcast.emit('message-received', message)
      })
    })
  }
  res.end()
}
