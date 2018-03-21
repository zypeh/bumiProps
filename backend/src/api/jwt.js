
import jwt from 'jsonwebtoken'
import { JwtSecret } from '../config'

export const createTokens = async (user) => {
    const createToken = jwt.sign(
        {
            user: user.username,
            hb: '💓',
        },
        JwtSecret,
        {
            expiresIn: '20m',
        }
    )

    const createRefreshToken = jwt.sign(
        {
            user: user.username,
            verified: user.email_verified,
            name: user.name,
            avatar: user.avatar,
        },
        JwtSecret,
        {
            expiresIn: '7d',
        },
    )

    return Promise.all([createToken, createRefreshToken])
}