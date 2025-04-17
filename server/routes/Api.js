import ArtistController from '../controllers/ArtistController.js'
import AuthenticateToken from '../middleware/AuthenticateToken.js';
import { Router} from 'express';
const router = Router();

//* VEREFY THE TOKEN 1ST TO USE THE API
router.use(AuthenticateToken.verifyToken);

//* ROUTES FOR ARTISTS
router.route('/artists')
    .get(ArtistController.index)
    .post(ArtistController.store);
router.route('/artists/:id')
    .get(ArtistController.show)
    .put(ArtistController.update)
    .delete(ArtistController.destroy);

















export default router;