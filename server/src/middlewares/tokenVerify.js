import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenVerify = (req, res, next) => {
    const bearerToken = req.headers.authorization
    if(!bearerToken) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const token = bearerToken.split(' ')[1]
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY)
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message })
    }
}

export default tokenVerify