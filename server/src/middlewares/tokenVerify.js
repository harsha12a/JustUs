import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenVerify = (req, res, next) => {
    const bearerToken = req.cookies.token || req.headers.authorization
    if(!bearerToken) {
        return res.status(401).json({ message: 'Please login again' })
    }
    try {
        jwt.verify(bearerToken, process.env.SECRET_KEY)
        next()
    }
    catch (err) {
        const refresh = req.cookies.refreshToken
        if(!refresh) return res.status(401).json({ message: 'Refresh token not found' })
        try {
            const decoded =jwt.verify(refresh, process.env.REFRESH_KEY)
            console.log(decoded.id)
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, {
                expiresIn: "15m"
            })
            res.cookie('token', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 15 * 60 * 1000
            })
            console.log('refreshed')
            next()
        }
        catch (err) {
            return res.status(401).json({ message: 'Unauthorized', error: err.message })
        }
    }
}

export default tokenVerify