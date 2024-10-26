import express from 'express';
import { signupUser, loginUser, logoutUser, getCurrentUser, updateUser } from '../../controllers/usersController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', authenticateToken, logoutUser);
router.get('/current', authenticateToken, getCurrentUser);
router.patch('/', authenticateToken, updateUser);

export default router;