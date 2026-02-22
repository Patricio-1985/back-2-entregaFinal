import Ticket from '../models/ticket.js';
import Product from '../models/product.js';
import { userDTO } from '../dto/user.dto.js';

export const checkout = async (req, res) => {
  try {
    const { products } = req.body;
    const userId = req.user.id;
    const userEmail = req.user.email;
    let total = 0;
    const purchasedProducts = [];
    const failedProducts = [];

    if (!products || !Array.isArray(products)) {
      return res.status(400).json({ error: 'El campo products es requerido y debe ser un array' });
    }

    for (const item of products) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        failedProducts.push(item);
        continue;
      }

      product.stock -= item.quantity;
      await product.save();

      purchasedProducts.push({
        productId: product._id,
        name: product.name,
        quantity: item.quantity,
        price: product.price
      });
      total += product.price * item.quantity;
    }

    if (purchasedProducts.length > 0) {
      const ticket = new Ticket({
        amount: total,
        purchaser: userEmail,
        userId: userId,
        products: purchasedProducts
      });
      await ticket.save();

      return res.status(201).json({
        message: 'Compra realizada',
        ticket,
        failedProducts: failedProducts.length > 0 ? failedProducts : null
      });
    }

    return res.status(400).json({
      message: 'No se pudo procesar ningún producto por falta de stock',
      failedProducts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};