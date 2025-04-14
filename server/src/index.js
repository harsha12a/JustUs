import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import user from './routers/user.route.js'
import chat from './routers/chat.route.js'
import message from './routers/message.route.js'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
let app = express()
dotenv.config()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.send('JustUs Server is running')
})

app.use('/user', user)
app.use('/chat', chat)
app.use('/message', message)

app.use((req, res, next) => {
    console.log('route not found')
    next()
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})