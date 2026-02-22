import { Router } from 'express';
import { authenticate, requireRole } from '../middlewares/auth.middleware.js';
import { createProduct, updateProduct, deleteProduct } from '../controllers/product.controller.js';

const router = Router();

// Crear producto (solo admin)
router.post('/', authenticate, requireRole('admin'), createProduct);

// Actualizar producto (solo admin)
router.put('/:id', authenticate, requireRole('admin'), updateProduct);

// Eliminar producto (solo admin)
router.delete('/:id', authenticate, requireRole('admin'), deleteProduct);

export default router;