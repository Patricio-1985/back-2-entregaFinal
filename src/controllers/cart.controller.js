import Ticket from '../models/ticket.js';
import Product from '../models/product.js';

export const checkout = async (req, res) => {
  const { products } = req.body; // productos en el carrito
  const userId = req.user.id;
  let total = 0;
  const purchasedProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.productId);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ error: `Stock insuficiente para ${product.name}` });
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

  const ticket = new Ticket({ userId, products: purchasedProducts, total });
  await ticket.save();

  res.status(201).json({ message: 'Compra realizada', ticket });
};
