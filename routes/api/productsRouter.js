import express from 'express';
import { getAllProducts, getProductById, getProductByName } from '../../controllers/productsController.js';
import { authenticateToken } from '../../middlewares/auth.js';

const router = express.Router();

router.get('/', authenticateToken, getAllProducts);
router.get('/:productId', authenticateToken, getProductById);
router.get('/query/:productName', authenticateToken, getProductByName);

export default router;