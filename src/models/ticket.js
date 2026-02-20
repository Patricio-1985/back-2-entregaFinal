import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: Number,
  purchasedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Ticket', ticketSchema);