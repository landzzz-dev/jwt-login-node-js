import { JwtTestDB } from '../../databases/MySqlConnection.js';
import bcrypt from 'bcryptjs';

class RegisterController {
    //! REGISTER
    static async register(req, res) {
        const { name, username, email, password } = req.body;
        
        try {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            //* Check if email is valid format
            if (!emailPattern.test(email)) {
                return res.status(400).json({ message: 'Invalid email format' });
            }

            //* Checlk if password is at least 6 characters
            if (password.length < 6) {
                return res.status(400).json({ message: 'Password at least 6 characters' });
            }

            //* Check if username or email already exists
            const [existingUser] = await JwtTestDB.query(
                `SELECT * FROM users WHERE username = ? OR email = ?`,
                [username, email]
            );

            if (existingUser.length > 0) {
                return res.status(409).json({ message: "Username or email already in use." });
            }

            //* Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            //* Insert user into database
            const sql = `
                INSERT INTO users (name, username, email, password, refresh_token, created_at, updated_at)
                VALUES (?, ?, ?, ?, ?, NOW(), NOW())
            `;

            await JwtTestDB.query(sql, [name, username, email, hashedPassword, null]);
            res.status(201).json({ status: 'success', message: 'You are now registered.' });
        } catch (err) {
            console.error('Error registering user: ', err);
            res.status(500).json({ status: 'error', message: 'Internal server error: ' + err});
        }
    }
}


export default RegisterController;
