import express from "express"
import { getAllUsers, getUserById, createUser, loginUser } from "../controllers/user.controller.js"
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.post('/login', loginUser)

export default router