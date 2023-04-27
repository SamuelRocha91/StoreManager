const productsServices = require('../services/products.services');

const listProducts = async (_req, res) => {
  const { message } = await productsServices.allProducts();
  res.status(200).json(message);
};

const getProducts = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.productsById(id);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const create = async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: '"name" is required' });
  if (name.length < 5) {
    return res.status(422).json(
      { message: '"name" length must be at least 5 characters long' },
    );
  }
  const { message } = await productsServices.createProduct(name);
  return res.status(201).json(message);
};
module.exports = {
  getProducts,
  listProducts,
  create,
};
