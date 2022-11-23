import type { NextApiRequest } from "next";
import type { NextApiResponseServerIO } from "../../types/next";
import { Server } from 'socket.io'

// const SocketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
//   if (res.socket.server.io) {
//     console.log('socket.io already running')
//     res.end()
//     return
//   }

//   console.log('*First use, starting socket.io')

//   const io = new Server(res.socket.server as any)

//   io.on('connection', socket => {
//     socket.broadcast.emit('a user connected')
//     socket.on('hello', msg => {
//       socket.emit('hello', 'world!')
//     })

//     socket.on('message', message => {
//       console.log('m received', message)
//     })
//   })

//   // io.on('message', message => {
//   //   console.log('m received', message)
//   // })

//   res.socket.server.io = io
//   res.end()
// }

// export default SocketHandler

const SocketHandler = (_req: NextApiRequest, res: NextApiResponseServerIO) => {
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

export default SocketHandler