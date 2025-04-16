import { saveMsg } from "../src/controllers/message.controller.js"

const onlineUsers = new Map()

function initSocket (io) {
    io.on('connection', (socket) => {
        console.log('Socket Connected', socket.id)

        socket.on('register', (username) => {
            onlineUsers.set(username, socket.id)
        })

        socket.on('sendMsg', async ({ chatId, senderId, receiverUsername, content }) => {
            try {
                const resp = await saveMsg(chatId, senderId, content)
                const receiver = onlineUsers.get(receiverUsername)
                if(receiver) {
                    io.to(receiver).emit('receieveMsg', resp)
                }
                socket.emit('messageSent', resp)
            }
            catch(err) {
                console.log(err)
            }
        })

        socket.on('disconnect', () => {
            for(let [name, sid] of onlineUsers.entries()) {
                if(sid === socket.id) {
                    onlineUsers.delete(name)
                    break
                }
            }
        })
    })
}

export default initSocket