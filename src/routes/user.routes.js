import { Router } from 'express';
import { requireRole } from '../middlewares/auth.middleware.js';
import {   createUser,  getUsers,  getUserById,  updateUser,  deleteUser,
      getCurrentUser } from '../controllers/user.controller.js';

const router = Router();

// Crear usuario
router.post('/', createUser);

// Obtener todos los usuarios (solo admin)
router.get('/', requireRole('admin'), getUsers);

// Obtener un usuario por ID (solo admin)
router.get('/:id', requireRole('admin'), getUserById);

// Actualizar usuario
router.put('/:id', updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', requireRole('admin'), deleteUser);

// Obtener usuario actual (autenticado)
router.get('/current', getCurrentUser);

export default router;