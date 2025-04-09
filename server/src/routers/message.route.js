import express from 'express'
import { getMessages, createMessage } from '../controllers/message.controller.js'
const router = express.Router()

router.get('/', getMessages)
router.post('/:id', createMessage)

export default router