import express from 'express'
import { getMessages, createMessage, deleteMessage } from '../controllers/message.controller.js'
import tokenVerify from '../middlewares/tokenVerify.js'
const router = express.Router()

router.get('/:id/:time', tokenVerify, getMessages)
router.post('/:id', tokenVerify, createMessage)
router.delete('/:id', tokenVerify, deleteMessage)

export default router