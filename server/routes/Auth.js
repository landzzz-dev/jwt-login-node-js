import AuthUserController from '../controllers/auth/AuthUserController.js';
import LoginController from '../controllers/auth/LoginController.js';
import RegisterController from '../controllers/auth/RegisterController.js';
import RefreshTokenController from '../controllers/token/RefreshTokenController.js';
import { Router } from 'express';
const router = Router();

//* TOKEN
router.route('/token/refresh')
    .post(RefreshTokenController.refreshAccessToken)

//* CHECK USER IF EXIST IN COOKIES FOR LOGIN
router.route('/user')
    .get(AuthUserController.checkAuthUser)

//* LOGIN & REGISTER
router.route('/login')
    .post(LoginController.login)
router.route('/logout')
    .delete(LoginController.logout)

router.route('/register')
    .post(RegisterController.register)


export default router;