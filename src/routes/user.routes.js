import { Router } from 'express';
import { requireRole } from '../middlewares/auth.middleware.js';
import {   createUser,   getUsers,   getUserById,   updateUser,   deleteUser } from '../controllers/user.controller.js';

const router = Router();

// Crear usuario
router.post('/', createUser);

// Obtener todos los usuarios
router.get('/', getUsers);

// Obtener un usuario por ID
router.get('/:id', getUserById);

// Actualizar usuario
router.put('/:id', updateUser);

// Eliminar usuario (solo admin)
router.delete('/:id', requireRole('admin'), deleteUser);

export default router;