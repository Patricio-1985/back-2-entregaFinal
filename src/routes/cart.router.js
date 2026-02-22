import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import { checkout } from '../controllers/cart.controller.js';

const router = Router();
router.post('/checkout', authenticate, checkout);
export default router;