import express from 'express';
import { signupUser, loginUser, logoutUser, getCurrentUser, updateUser, refreshUser } from '../../controllers/usersController.js';
import { authenticateToken, authenticateRefreshToken } from '../../middlewares/auth.js';

const router = express.Router();

router.post('/signup', signupUser);
router.post('/login', loginUser);
router.get('/logout', authenticateToken, logoutUser);
router.get('/current', authenticateToken, getCurrentUser);
router.patch('/update', authenticateToken, updateUser);
router.post('/refresh', authenticateRefreshToken, refreshUser);

export default router;