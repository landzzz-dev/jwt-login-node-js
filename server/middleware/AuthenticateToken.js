import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class AuthenticateToken {
    static verifyToken(req, res, next) {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const jwtAccessToken = process.env.JWT_ACCESS_TOKEN;

        if(!token) {
            return res.status(401).json({ status: 'error', message: 'Unauthorized: Token is required.'});
        }

        jwt.verify(token, jwtAccessToken, (err, user) => {
            if(err) {
                return res.status(403).json({ status: 'error', message: 'Forbidden: Invalid or expired token.'});
            }
            
            req.user = user;
            next();
        })
    }
}


export default AuthenticateToken;