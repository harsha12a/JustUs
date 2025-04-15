import prisma from '../utils/prisma.config.js'
import asyncHandler from 'express-async-handler'

export const getChats = asyncHandler ( async (req, res) => {
    let resp = await prisma.chat.findMany()
    res.send(resp)
})

export const getChat = asyncHandler ( async (req, res) => {
    try {
        let resp = await prisma.chat.findMany({
            where: {
                participants: {
                    has: req.params.id
                }
            },
            // include: {
            //     messages: {
            //         orderBy: {
            //             createdAt: 'asc'
            //         }
            //     }
            // },
            // orderBy: {
            //     updatedAt: 'desc'
            // }
        })
        await Promise.all(
            resp.map(async(user) => {
                let Users = user.participants
                let participants = await prisma.user.findMany({
                    where: {
                        id: {
                            in: Users
                        }
                    },
                    select: {
                        username: true,
                        profilePic: true
                    }
                })
                user.participants = participants
            })
        )
        if (!resp) return res.status(404).send({ message: "Chat not found" })
        else res.send(resp)
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

export const createChat = asyncHandler ( async (req, res) => {
    try {
        let users = await prisma.user.findMany({
            where: {
                username: {
                    in: [
                        req.body.userId.toLowerCase(),
                        req.body.inviteeId.toLowerCase()
                    ]
                }
            }
        })
        if(users.length < 2) return res.status(400).send({ message: "User not found" })
        let [u1, u2] = users
        let chat = await prisma.chat.findFirst({
            where: {
                participants: {
                    hasEvery: [
                        u1.id,
                        u2.id
                    ]
                }
            }
        })
        if (chat) return res.status(400).send({ message: "Chat already exists", payload: chat })
        let resp = await prisma.chat.create({
            data: {
                participants: [
                    u1.id,
                    u2.id
                ]
            }
        })
        res.send({ message: "Created", payload: resp })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

export const getMessage = asyncHandler ( async () => { // implemented at getChat() in chats
    // let resp = await prisma.chat.findUnique({
    //     where: {
    //         id: req.params.id
    //     },
    //     include: {
    //         messages: {
    //             orderBy: {
    //                 createdAt: 'asc'
    //             }
    //         }
    //     }
    // })
    // if (!resp) return res.status(404).send({ message: "Message not found" })
    // else res.send(resp)
})