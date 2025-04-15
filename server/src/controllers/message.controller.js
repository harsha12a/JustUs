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

export const createMessage = asyncHandler(async (req, res) => {
    try {
        let resp = await prisma.message.create({
            data: {
                chatId: req.params.id,
                senderId: req.body.senderId,
                content: req.body.content
            }
        })
        await prisma.chat.update({
            where: {
                id: req.params.id
            },
            data: {
                messages: {
                    connect: {
                        id: resp.id
                    }
                },
                updatedAt: new Date()
            }
        })
        res.status(201).json({ message: "Created", payload: resp })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})