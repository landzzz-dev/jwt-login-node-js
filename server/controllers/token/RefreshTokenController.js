import AccessTokenController from './AccessTokenController.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtRefreshToken = process.env.JWT_REFRESH_TOKEN;

class RefreshTokenController {
    static async refreshToken(username) {
        return jwt.sign(username, jwtRefreshToken, { expiresIn: '7d' });
    }

    static async refreshAccessToken(req, res) {
        const refreshToken = req.cookies.refresh_token;
        
        if (!refreshToken) {
            return res.status(401).json({ status: 'error', message: 'Token is required.' });
        }

        jwt.verify(refreshToken, jwtRefreshToken, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ status: 'status', message: 'Token is invalid.' });
            }

            //* Create a new access token
            const accessToken = await AccessTokenController.accessToken({ username: decoded.username });
            return res.status(200).json({ status: 'success', accessToken: accessToken });
        });
    }
}


export default RefreshTokenController;