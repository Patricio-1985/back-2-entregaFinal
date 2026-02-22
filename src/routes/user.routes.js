import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
import * as userController from '../controllers/user.controller.js';

const router = Router();

// Ruta protegida para obtener usuario actual
router.get('/current', authenticate, userController.getCurrentUser);

// Rutas dinámicas (protegidas)
router.get('/:id', authenticate, userController.getUserById);
router.put('/:id', authenticate, userController.updateUser);
router.delete('/:id', authenticate, userController.deleteUser);

// Rutas públicas
router.get('/', userController.getUsers);
router.post('/', userController.createUser);

export default router;
