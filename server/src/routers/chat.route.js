import express from 'express'
import { getChats, getChat } from '../controllers/chat.controller.js'

const router = express.Router()

router.get('/', getChats)
router.get('/:id', getChat)

export default router