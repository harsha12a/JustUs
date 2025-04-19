import { io } from 'socket.io-client'

const socket = io('https://justus-8qo2.onrender.com', {
    withCredentials: true
});

export default socket