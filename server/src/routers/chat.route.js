import express from 'express'
import { getChats, getChat, createChat, getMessage } from '../controllers/chat.controller.js'

const router = express.Router()

router.get('/', getChats)
router.get('/:id', getChat)
router.post('/', createChat)
router.get('/msg/:id', getMessage)

export default router