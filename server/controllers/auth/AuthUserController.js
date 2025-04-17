import jwt from "jsonwebtoken";

class AuthUserController {
    //! CHECK AUTH USER
    static async checkAuthUser(req, res) {
        try {
            res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
            res.setHeader("Pragma", "no-cache");
            res.setHeader("Expires", "0");

            const refreshToken = req.cookies.refresh_token;

            if (!refreshToken) {
                return res.status(401).json({ status: 'error', message: "User is logged out." });
            } else {
                //* Verify the refresh token
                jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
                    if (err) {
                        return res.status(403).json({ status: 'error', message: "Forbidden: Invalid refresh token" });
                    }
    
                    return res.status(200).json({ status: 'success', user });
                });
            }

        } catch (err) {
            console.error("Error checking auth:", err);
            return res.status(500).json({ status: 'error', message: "Internal server error" });
        }
    }
}

export default AuthUserController;
