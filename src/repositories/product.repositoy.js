import Product from '../models/product.js';

class ProductRepository {
  async create(data) {
    const product = new Product(data);
    return await product.save();
  }

  async findById(id) {
    return await Product.findById(id);
  }

  async findAll() {
    return await Product.find();
  }

  async update(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Product.findByIdAndDelete(id);
  }
}

export default new ProductRepository();