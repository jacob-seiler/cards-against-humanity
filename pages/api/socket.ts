import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import type { Message } from "../../types/socket";
import { EVENTS } from "../../types/socket";
import { Server } from 'socket.io'

export default function SockerHandler(_req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket is initializing')
    const io = new Server(res.socket.server as any)
    res.socket.server.io = io

    io.on('connection', socket => {
      socket.on(EVENTS.CLIENT.MESSAGE, text => {
        const message: Message = {
          timestamp: new Date().getTime(),
          content: text,
          from: socket.id // TODO temp
        }
        
        socket.broadcast.emit(EVENTS.SERVER.MESSAGE, message)
      })
    })
  }
  res.end()
}
