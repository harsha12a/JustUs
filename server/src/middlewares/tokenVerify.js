import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

const tokenVerify = (req, res, next) => {
    let accessToken = req.cookies.token || req.headers.authorization

    if (req.headers.authorization?.startsWith('Bearer ')) {
        accessToken = req.headers.authorization.split(' ')[1]
    }

    if (!accessToken) {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token not found' })
        }

        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_KEY)
            const newAccessToken = jwt.sign({ id: decoded.id }, process.env.SECRET_KEY, {
                expiresIn: '15m',
            })

            res.cookie('token', newAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 15 * 60 * 1000,
            })

            req.user = { id: decoded.id }
            console.log('Access token refreshed')
            return next()
        } catch (err) {
            return res.status(401).json({ message: 'Invalid refresh token', error: err.message })
        }
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.SECRET_KEY)
        req.user = { id: decoded.id }
        return next()
    } catch (err) {
        return res.status(401).json({ message: 'Invalid access token', error: err.message })
    }
}

export default tokenVerify
