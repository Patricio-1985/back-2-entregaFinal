import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0.01
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Beauty', 'Food'
    ]
  },
  images: [{
    type: String,
    trim: true
  }],
  stock: {
    type: Number,
    required: true,
    min: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Índices para mejorar el rendimiento
productSchema.index({ name: 'text' });
productSchema.index({ price: 1 });
productSchema.index({ category: 1 });

export default mongoose.model('Product', productSchema);