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
  const { message } = await productsServices.createProduct(name);
  return res.status(201).json(message);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { type, message } = await productsServices.updateProduct(id, name);
  if (type) return res.status(404).json({ message });
  return res.status(200).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await productsServices.deleteProduct(id);
  if (type) return res.status(404).json({ message });
  return res.status(204).send();
};

module.exports = {
  getProducts,
  listProducts,
  create,
  update,
  deleteProduct,
};
