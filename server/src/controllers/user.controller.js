import prisma from "../utils/prisma.config.js"

export const getAllUsers = async (req, res) => {
    let resp = await prisma.user.findMany()
    res.send(resp)
}

export const getUserById = async (req, res) => {
    let resp = await prisma.user.findUnique({
        where: {
            id: req.params.id
        }
    })
    if (!resp) return res.status(404).send({ message: "User not found" })
    else res.send(resp)
}