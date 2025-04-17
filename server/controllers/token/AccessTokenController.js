import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jwtAccessToken = process.env.JWT_ACCESS_TOKEN;

class AccessTokenController {
    static async accessToken(username) {
        return jwt.sign(username, jwtAccessToken, { expiresIn: '20s' });
    }
    
}


export default AccessTokenController;