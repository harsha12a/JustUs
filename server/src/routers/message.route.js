import express from 'express'
import { getMessages, createMessage } from '../controllers/message.controller.js'
import tokenVerify from '../middlewares/tokenVerify.js'
const router = express.Router()

router.get('/', getMessages)
router.post('/:id', tokenVerify, createMessage)

export default router