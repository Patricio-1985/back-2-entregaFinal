import Ticket from '../models/ticket.js';
import Product from '../models/product.js';
import { userDTO } from '../dto/user.dto.js';

export const checkout = async (req, res) => {
  const { products } = req.body;
  const userId = req.user.id;
  const userEmail = req.user.email;
  let total = 0;
  const purchasedProducts = [];
  const failedProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      failedProducts.push(item);
      continue; // sigue con los demás productos
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

  // Si hay productos comprados, genera el ticket
  if (purchasedProducts.length > 0) {
    const ticket = new Ticket({
      code: 'TCKT-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      amount: total,
      purchaser: userEmail,
      userId: userId,
      products: purchasedProducts
    });
    await ticket.save();

    // Devuelve ticket y productos no procesados
    return res.status(201).json({
      message: 'Compra realizada',
      ticket,
      failedProducts: failedProducts.length > 0 ? failedProducts : null
    });
  }

  // Si nada se pudo comprar
  return res.status(400).json({
    message: 'No se pudo procesar ningún producto por falta de stock',
    failedProducts
  });
  
};