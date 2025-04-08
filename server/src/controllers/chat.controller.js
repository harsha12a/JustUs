import prisma from '../utils/prisma.config.js'
import asyncHandler from 'express-async-handler'

export const getChats = asyncHandler ( async (req, res) => {
    let resp = await prisma.chat.findMany()
    res.send(resp)
})

export const getChat = asyncHandler ( async (req, res) => {
    let resp = await prisma.chat.findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!resp) return res.status(404).send({ message: "Chat not found" })
    else res.send(resp)
})

export const createChat = asyncHandler ( async (req, res) => {
    try {
        let resp = await prisma.chat.create({
            data: {
                participants: [
                    req.body.userId,
                    req.body.inviteeId
                ]
            }
        })
        res.send({ message: "Created", payload: resp })
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})