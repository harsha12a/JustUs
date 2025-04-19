import prisma from '../utils/prisma.config.js'
import asyncHandler from 'express-async-handler'

export const getMessages = asyncHandler(async (req, res) => {
    try {
        let resp = await prisma.chat.findMany({
            where: {
                id: req.params.id
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        })
        resp = resp[0].messages
        res.status(200).json(resp)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export async function saveMsg (id, senderId, content) {
    let resp = await prisma.message.create({
        data: {
            chatId: id,
            senderId: senderId,
            content: content
        }
    })
    return resp
}

export const createMessage = asyncHandler(async (req, res) => {
    try {
        const resp = await saveMsg(req.params.id, req.body.senderId, req.body.content)
        res.status(201).json({ message: "Created", payload: resp })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

export const delMsg = async (id) => {
    let resp = await prisma.message.delete({
        where: {
            id: id
        }
    })
    return resp
}

export const deleteMessage = asyncHandler(async (req, res) => {
    try {
        const resp = await delMsg(req.params.id)
        res.status(200).json({ message: "Deleted", payload: resp })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})