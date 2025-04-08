import prisma from "../utils/prisma.config.js"
import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"

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
            else res.send({ message: "Login successful", resp })
        }
    }
    catch (error) {
        return res.status(500).send({ message: error.message })
    }
})