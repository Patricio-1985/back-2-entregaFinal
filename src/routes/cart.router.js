import { Router } from 'express';
import { checkout } from '../controllers/cart.controller.js';

const router = Router();
router.post('/checkout', checkout);
export default router;
