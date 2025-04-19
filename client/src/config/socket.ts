import { io } from 'socket.io-client'

const socket = io('https://just-us-server.vercel.app', {
    withCredentials: true
});

export default socket