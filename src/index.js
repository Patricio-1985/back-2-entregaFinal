import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.router.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware (DEBE estar ANTES de las rutas)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);

// Conexión a MongoDB y levante del servidor
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
