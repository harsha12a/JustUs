import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenVerify = (req, res, next) => {
    const bearerToken = req.cookies.token || req.headers.authorization
    console.log(req.cookies.token)
    if(!bearerToken) {
        return res.status(401).json({ message: 'Token invalid' })
    }
    try {
        jwt.verify(bearerToken, process.env.SECRET_KEY)
        next()
    }
    catch (err) {
        return res.status(401).json({ message: 'Unauthorized', error: err.message })
    }
}

export default tokenVerify