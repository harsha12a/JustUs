import express from "express"
import { getAllUsers, getUserById, createUser, loginUser, getChats } from "../controllers/user.controller.js"
import tokenVerify from "../middlewares/tokenVerify.js"
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)
router.get('/chats/:id', getChats)

export default router