import userRepository from '../repositories/user.repository.js';
import { userDTO } from '../dto/user.dto.js';

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const user = await userRepository.create(req.body);
    const safeUser = userDTO(user);
    res.status(201).json(safeUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Leer todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    const safeUsers = users.map(userDTO);
    res.json(safeUsers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leer un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const safeUser = userDTO(user);
    res.json(safeUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const user = await userRepository.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    const safeUser = userDTO(user);
    res.json(safeUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.delete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener usuario actual
export const getCurrentUser = (req, res) => {
  try {
    const safeUser = userDTO(req.user);
    res.json(safeUser);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};