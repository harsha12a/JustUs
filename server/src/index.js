import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import user from './routers/user.route.js'
import chat from './routers/chat.route.js'
import message from './routers/message.route.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import initSocket from '../socket/socket.js'
import { Server } from 'socket.io'
import http from 'http'
let app = express()
dotenv.config()

app.use(cors({
    origin: 'https://just-us-client.vercel.app',
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: 'https://just-us-client.vercel.app',
        credentials: true
    }
})

initSocket(io)

app.get('/', (req, res) => {
    res.send('JustUs Server is running')
})

app.use('/user', user)
app.use('/chat', chat)
app.use('/message', message)

app.use((req, res, next, err) => {
    console.log(err, 'err')
    next()
})

server.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})