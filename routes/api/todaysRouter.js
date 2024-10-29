import express from 'express';
import { getAllTodays, getTodayById, dailyIntake, consumeProduct, deleteConsumeProduct } from '../../controllers/todaysController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllTodays);
router.get('/:todayId', authenticateToken, getTodayById);
router.post('/', authenticateToken, dailyIntake);
router.patch('/:todayId', authenticateToken, consumeProduct);
router.delete('/:todayId/:productId', authenticateToken, deleteConsumeProduct);
// router.post('/today', authenticateToken, addToday);
// router.delete('/:todayId', authenticateToken, deleteToday);
// router.put('/:todayId', authenticateToken, updateToday);
// router.patch('/:todayId/product', authenticateToken, updateGramsProduct);

export default router;