const productsModel = require('../models/products.model');

const allProducts = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findByName = async (name) => {
  const result = await productsModel.searchByName(name);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  console.log(result);
  return { type: null, message: result };
};

const productsById = async (productId) => {
  const result = await productsModel.findById(productId);
  // pode-se fazer isso na validation antes e tipo se if.type return error
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  return { type: null, message: result };
};

const createProduct = async (name) => {
  const result = await productsModel.insertProduct(name);
  const newProduct = await productsModel.findById(result);
  return { type: null, message: newProduct };
};

const updateProduct = async (id, name) => {
  const result = await productsModel.findById(id);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.updateProduct(id, name);
  return { type: null, message: { id, name } };
};

const deleteProduct = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  await productsModel.deleteProduct(id);
  return { type: null, message: 'ok' };
};

module.exports = {
  allProducts,
  productsById,
  createProduct,
  updateProduct,
  deleteProduct,
  findByName,
};