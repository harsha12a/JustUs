import prisma from "../utils/prisma.config.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const getAllUsers = asyncHandler ( async (req, res) => {
    let resp = await prisma.user.findMany()
    res.send(resp)
})

export const getUserById = asyncHandler ( async (req, res) => {
    let resp = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!resp) return res.status(404).send({ message: "User not found" })
    else res.send(resp)
})

export const createUser = asyncHandler ( async (req, res) => {
    try {
        let resp = await prisma.user.create({
            data: {
                username: req.body.username.toLowerCase(),
                email: req.body.email.toLowerCase(),
                password: await bcrypt.hash(req.body.password, 10),
                profilePic: req.body.profilePic
            }
        })
        res.send({ message: "Created", payload: resp })
    }
    catch (error) {
        if (error.code === "P2002") return res.status(400).send({ message: "Email already exists" })
        else return res.status(500).send({ message: error.message })
    }
})

export const loginUser = asyncHandler ( async (req, res) => {
    try {
        let resp = await prisma.user.findUnique({
            where: {
                username: req.body.username.toLowerCase()
            }
        })
        if (!resp) return res.status(404).send({ message: "User not found" })
        else {
            const isMatch = await bcrypt.compare(req.body.password, resp.password)
            if (!isMatch) return res.status(401).send({ message: "Invalid credentials" })
            else {
                let token = jwt.sign({ id: resp.id }, process.env.SECRET_KEY, {
                    expiresIn: "10s"
                })
                let refreshToken = jwt.sign({ id: resp.id }, process.env.REFRESH_KEY, {
                    expiresIn: "30d"
                })
                delete resp.password
                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 15 * 60 * 1000
                })
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 30 * 24 * 60 * 60 * 1000
                })
                return res.send({ message: "Login successful", resp })
            }
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

export const logoutUser = asyncHandler ( async (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: false,
        sameSite: 'Strict'
    })
    res.send({ message: "Logout successful" })
})

export const getChats = asyncHandler ( async () => { // implemented at getChat() in chats
    // try {
    //     let resp = await prisma.chat.findMany({
    //         where: {
    //             participants: {
    //                 has: req.params.id
    //             }
    //         },
    //         include: {
    //             messages: true
    //         }
    //     })
    //     res.send(resp)
    // }
    // catch (error) {
    //     return res.status(500).send({ message: error.message })
    // }
})