import userRepository from '../repositories/user.repository.js';

// Crear usuario
export const createUser = async (req, res) => {
  try {
    const user = await userRepository.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Leer todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const users = await userRepository.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Leer un usuario por ID
export const getUserById = async (req, res) => {
  try {
    const user = await userRepository.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
export const updateUser = async (req, res) => {
  try {
    const user = await userRepository.update(req.params.id, req.body);
    if (!user) return res.status(404).json({ error: 'Usuario No encontrado' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Eliminar usuario
export const deleteUser = async (req, res) => {
  try {
    const user = await userRepository.delete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario No encontrado' });
    res.json({ message: 'Usuario Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
