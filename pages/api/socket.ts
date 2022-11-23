import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import { Server } from 'socket.io'

const SocketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (res.socket.server.io) {
    console.log('socket.io already running')
    res.end()
    return
  }

  console.log('*First use, starting socket.io')

  const io = new Server(res.socket.server as any)

  io.on('connection', socket => {
    socket.broadcast.emit('a user connected')
    socket.on('hello', msg => {
      socket.emit('hello', 'world!')
    })
  })

  res.socket.server.io = io
  res.end()
}

export default SocketHandler