export const requireRole = (...roles) => {
  return (req, res, next) => {
    const { role } = req.user;

    if (!role) {
      return res.status(403).json({ error: 'Acceso denegado. Rol no definido.' });
    }

    if (!roles.includes(role)) {
      return res.status(403).json({ error: 'Acceso denegado. No tienes permiso.' });
    }

    next();
  };
};