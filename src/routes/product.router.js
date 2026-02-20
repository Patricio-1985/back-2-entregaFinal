import { Router } from 'express';
import { requireRole } from '../middlewares/auth.middleware.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

// Solo admin puede crear productos
router.post('/', requireRole('admin'), createProduct);

// Solo admin puede actualizar
router.put('/:id', requireRole('admin'), updateProduct);

// Solo admin puede eliminar
router.delete('/:id', requireRole('admin'), deleteProduct);

export default router;