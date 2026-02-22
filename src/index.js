// index.js
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.router.js';
import authRoutes from './routes/auth.routes.js';
import cartRoutes from './routes/cart.router.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Limpia barras dobles en URLs
app.use((req, res, next) => {
  req.url = req.url.replace(/[\\/]+/g, '/');
  next();
});

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/cart', cartRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('Conectado a MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error al conectar a la DB:', error);
  });

// Manejo de errores de conexión
mongoose.connection.on('error', (err) => {
  console.error('Error de conexión a MongoDB:', err);
});

// Manejador de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: 'Error interno del servidor'
  });
});

export default app;