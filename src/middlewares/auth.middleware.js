import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

export const requireRole = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!role || !roles.includes(role)) {
      return res.status(403).json({ error: 'Acceso denegado. No tienes permiso.' });
    }
    next();
  };
};