import express from 'express';
import { getAllProducts, getProductById } from '../../controllers/productsController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.post('/:productId', authenticateToken, getProductById);

export default router;