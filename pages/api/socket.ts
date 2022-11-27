import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import type { Message } from "../../types/socket";
import { EVENTS } from "../../types/socket";
import { Server } from 'socket.io'

const names = new Map<string, string>()

export default function SockerHandler(_req: NextApiRequest, res: NextApiResponseServerIO) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
    res.end()
    return
  }
  
  console.log('Socket is initializing')
  const io = new Server(res.socket.server as any)
  res.socket.server.io = io

  io.on('connection', socket => {
    socket.emit(EVENTS.SERVER.WELCOME, Array.from(names.values()))
    names.set(socket.id, socket.id)
    socket.broadcast.emit(EVENTS.SERVER.PLAYER_JOIN, names.get(socket.id))

    socket.on('disconnect', _ => {
      socket.broadcast.emit(EVENTS.SERVER.PLAYER_LEAVE, names.get(socket.id))
      names.delete(socket.id)
    })

    socket.on(EVENTS.CLIENT.MESSAGE, text => {
      const message: Message = {
        timestamp: new Date().getTime(),
        content: text,
        from: names.get(socket.id) ?? "Anonymous"
      }
      
      socket.broadcast.emit(EVENTS.SERVER.MESSAGE, message)
    })
  })

  res.end()
}
