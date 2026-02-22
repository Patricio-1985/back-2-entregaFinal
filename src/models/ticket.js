import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  code: { 
    type: String, 
    unique: true, 
    required: true 
  },
  purchase_datetime: { 
    type: Date, 
    default: Date.now, 
    required: true 
  },
  amount: { 
    type: Number, 
    required: true 
  },
  purchaser: { 
    type: String, 
    required: true 
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      productId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      name: String,
      quantity: Number,
      price: Number
    }
  ]
});

// Generar código único antes de guardar
ticketSchema.pre('save', function (next) {
  if (!this.code) {
    this.code = 'TCKT-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
  }
  next();
});

export default mongoose.model('Ticket', ticketSchema);