import express from 'express'
import { getChats, getChat, createChat, getMessage } from '../controllers/chat.controller.js'
import tokenVerify from '../middlewares/tokenVerify.js'

const router = express.Router()

router.get('/', getChats)
router.get('/:id/:time', tokenVerify, getChat)
router.post('/', tokenVerify, createChat)
router.get('/msg/:id', getMessage)

export default router