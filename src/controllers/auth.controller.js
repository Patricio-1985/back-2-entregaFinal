import User from '../models/user.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetToken = token;
    user.resetTokenExpires = Date.now() + 3600000;
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
    });

    const resetUrl = `http://localhost:8080/api/auth/reset-password?token=${token}`;
    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Recuperación de contraseña',
      text: `Haz clic aquí para restablecer tu contraseña: ${resetUrl}`
    });

    res.json({ message: 'Enlace enviado al correo' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded.id,
      resetToken: token,
      resetTokenExpires: { $gt: Date.now() }
    });

    if (!user) return res.status(400).json({ error: 'Token inválido o expirado' });
    if (user.password === newPassword) {
      return res.status(400).json({ error: 'No puedes usar la misma contraseña anterior' });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpires = undefined;
    await user.save();

    res.json({ message: 'Contraseña actualizada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};