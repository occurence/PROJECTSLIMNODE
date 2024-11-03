import express from 'express';
import { getAllTodays, getTodayById, deleteTodayById, dailyIntake, consumeProduct, deleteConsumeProduct } from '../../controllers/todaysController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllTodays);
router.get('/:todayDate', authenticateToken, getTodayById);
router.delete('/:todayId', authenticateToken, deleteTodayById);
router.post('/', authenticateToken, dailyIntake);
router.patch('/:todayDate', authenticateToken, consumeProduct);
router.delete('/:todayId/:productId', authenticateToken, deleteConsumeProduct);

export default router;