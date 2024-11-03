import express from 'express';
import { signupUser, loginUser, logoutUser, getCurrentUser, updateUser, refreshUser } from '../../controllers/usersController.js';
import { authenticateToken, authenticateRefreshToken } from '../../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * /api/users/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Registration successful
 *       400:
 *         description: Validation error
 */
router.post('/signup', signupUser);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Unauthorized
 */
router.post('/login', loginUser);
/**
 * @swagger
 * /api/users/logout:
 *   get:
 *     summary: Log out the user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logout successful'
 *       401:
 *         description: Unauthorized
 */
router.get('/logout', authenticateToken, logoutUser);
/**
 * @swagger
 * /api/users/current:
 *   get:
 *     summary: Get the current logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get current user successful
 *       401:
 *         description: Unauthorized
 */
router.get('/current', authenticateToken, getCurrentUser);
/**
 * @swagger
 * /api/users/update:
 *   patch:
 *     summary: Patch the info of logged-in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Update successful
 *       401:
 *         description: Unauthorized
 */
router.patch('/update', authenticateToken, updateUser);
/**
 * @swagger
 * /api/users/refresh:
 *   post:
 *     summary: Refresh token
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Refresh successful
 *       401:
 *         description: Unauthorized
 */
router.post('/refresh', authenticateRefreshToken, refreshUser);

export default router;