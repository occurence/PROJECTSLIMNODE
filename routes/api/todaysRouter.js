import express from 'express';
import { getAllTodays, getTodayById, deleteTodayById, dailyIntake, consumeProduct, deleteConsumeProduct } from '../../controllers/todaysController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllTodays);
// router.get('/:todayId', authenticateToken, getTodayById);
router.get('/:todayDate', authenticateToken, getTodayById);
router.delete('/:todayId', authenticateToken, deleteTodayById);
router.post('/', authenticateToken, dailyIntake);
// router.patch('/:todayId', authenticateToken, consumeProduct);
// router.patch('/:todayDate', authenticateToken, consumeProduct);
// router.patch('/', authenticateToken, consumeProduct);
router.patch('/:todayDate', authenticateToken, consumeProduct);
router.delete('/:todayId/:productId', authenticateToken, deleteConsumeProduct);

export default router;