import { JwtTestDB } from "../../databases/MySqlConnection.js";
import AccessTokenController from "../token/AccessTokenController.js";
import RefreshTokenController from "../token/RefreshTokenController.js";
import dotenv from 'dotenv';
import bcrypt from "bcryptjs";
dotenv.config();

class LoginController {
    //! LOGIN
    static async login(req, res) {
        const { username, email, password } = req.body;

        try {
            if(!username || !password) {
                return res.status(400).json({ status: 'error', message: 'Username and Password required.' });
            }

            //* Check if username or email if exists
            const [data] = await JwtTestDB.query(
                `SELECT * FROM users WHERE username = ? OR email = ?`,
                [username, email]
            );

            const user = data[0];

            //* Check user if exist
            if(!user) {
                return res.status(404).json({ status: 'error', message: "User not found." });
            }

            //* Compare password
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return res.status(404).json({ status: 'error', message: "Username and Password don't match." });
            }

            const userObject = { username: user.username };

            //* Accesstoken send back to front end
            const accessToken = await AccessTokenController.accessToken(userObject);
            
            //* Refreshtoken save in cookies
            const refreshToken = await RefreshTokenController.refreshToken(userObject);
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,                  //* Prevent JavaScript access (XSS protection)
                secure: true,                    //* Use HTTPS only
                sameSite: "Strict",              //* Prevent CSRF
                path: "/auth",                   //* Limit access to specific routes
                maxAge: 7 * 24 * 60 * 60 * 1000, //* 7 days
            });

            res.status(200).json({ status: 'success', user: userObject, accessToken: accessToken });
        } catch (err) {
            console.error("Error logging in: ", err);
            return res.status(500).json({ status: 'error', message: "Internal server error: " + err });
        }
    }

    //! LOGOUT
    static async logout(req, res) {
        try {
            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return res.status(204).json({ status: 'error', message: "No token to revoke." });
            }

            //* Clear the cookie
            res.clearCookie("refresh_token", {
                httpOnly: true,
                secure: true,
                sameSite: "Strict",
                path: "/auth",
            });

            return res.status(200).json({ status: 'success', message: "Logged out successfully." });
        } catch (err) {
            console.error("Error logging out:", err);
            return res.status(500).json({ status: 'error', message: "Internal server error." });
        }
    }
}


export default LoginController;